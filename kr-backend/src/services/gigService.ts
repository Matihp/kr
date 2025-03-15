import { AppDataSource } from "../config/data-source";
import { CreateGigDto } from "../dtos/gigDto";
import { Gig } from "../models/gigModel";
import { GigReward } from "../models/gigRewardModel";
import { GigStage } from "../models/gigStageModel";
import { Proposal } from "../models/proposalModel";
import { GigType } from "../types/gigTypes";

export class GigService {
  private gigRepository = AppDataSource.getRepository(Gig);
  private stageRepository = AppDataSource.getRepository(GigStage);
  private rewardRepository = AppDataSource.getRepository(GigReward);
  private proposalRepository = AppDataSource.getRepository(Proposal);

  async createGig(
    recruiterId: string,
    createGigDto: CreateGigDto
  ): Promise<Gig> {
    const gig = new Gig();
    gig.recruiter = { id: recruiterId } as any;
    gig.title = createGigDto.title;
    gig.description = createGigDto.description;
    gig.type = createGigDto.type as GigType;
    gig.isAnonymous = createGigDto.isAnonymous || false;
    gig.budgetMin = createGigDto.budgetMin;
    gig.budgetMax = createGigDto.budgetMax;
    gig.flashDeadline = createGigDto.flashDeadline;
    gig.requiresTeam = createGigDto.requiresTeam || false;

    // Guardar primero el gig para obtener su ID
    const savedGig = await this.gigRepository.save(gig);

    // Crear etapas si se proporcionaron
    if (createGigDto.stages && createGigDto.stages.length > 0) {
      const stages = createGigDto.stages.map((stageDto) => {
        const stage = new GigStage();
        stage.gig = savedGig;
        stage.name = stageDto.name;
        stage.description = stageDto.description;
        stage.payment = stageDto.payment;
        stage.order = stageDto.order;
        return stage;
      });

      const savedStages = await this.stageRepository.save(stages);

      // Asignar la primera etapa como currentStage
      const initialStage =
        savedStages.find((stage) => stage.order === 1) || savedStages[0];
      savedGig.currentStage = initialStage;
      await this.gigRepository.save(savedGig);
    } else {
      // Si no se proporcionaron etapas, crear una etapa inicial por defecto
      const initialStage = new GigStage();
      initialStage.gig = savedGig;
      initialStage.name = "Initial Stage";
      initialStage.description = "Starting point of the gig";
      initialStage.payment = 0;
      initialStage.order = 1;

      const savedStage = await this.stageRepository.save(initialStage);

      // Asignar la etapa inicial como currentStage
      savedGig.currentStage = savedStage;
      await this.gigRepository.save(savedGig);
    }

    // Crear recompensas si se proporcionaron
    if (createGigDto.rewards) {
      const rewards = createGigDto.rewards.map((rewardDto) => {
        const reward = new GigReward();
        reward.gig = savedGig;
        reward.name = rewardDto.name;
        reward.description = rewardDto.description;
        reward.amount = rewardDto.amount;
        reward.criteria = rewardDto.criteria;
        return reward;
      });
      await this.rewardRepository.save(rewards);
    }

    // Cargar el gig con sus relaciones
    return this.gigRepository.findOne({
      where: { id: savedGig.id },
      relations: ["stages", "rewards", "currentStage"],
    }) as Promise<Gig>;
  }

  async getGigs(filters: {
    type?: GigType;
    minBudget?: number;
    maxBudget?: number;
    requiresTeam?: boolean;
  }): Promise<Gig[]> {
    const queryBuilder = this.gigRepository
      .createQueryBuilder("gig")
      .leftJoinAndSelect("gig.stages", "stages")
      .leftJoinAndSelect("gig.rewards", "rewards")
      .leftJoinAndSelect("gig.currentStage", "currentStage");
    if (filters.type) {
      queryBuilder.andWhere("gig.type = :type", { type: filters.type });
    }
    if (filters.minBudget) {
      queryBuilder.andWhere("gig.budgetMin >= :minBudget", {
        minBudget: filters.minBudget,
      });
    }
    if (filters.maxBudget) {
      queryBuilder.andWhere("gig.budgetMax <= :maxBudget", {
        maxBudget: filters.maxBudget,
      });
    }
    if (filters.requiresTeam !== undefined) {
      queryBuilder.andWhere("gig.requiresTeam = :requiresTeam", {
        requiresTeam: filters.requiresTeam,
      });
    }
    return queryBuilder.getMany();
  }

  async getRecruiterGigs(recruiterId: string): Promise<Gig[]> {
    return this.gigRepository.find({
      where: { recruiter: { id: recruiterId } },
      relations: ["stages", "rewards", "currentStage"],
      order: { createdAt: "DESC" },
    });
  }

  async getParticipatingGigs(freelancerId: string): Promise<any[]> {
    const proposals = await this.proposalRepository.find({
      where: { freelancer: { id: freelancerId } },
      relations: ["gig"],
    });
    // Extraemos los IDs de los gigs
    const gigIds = proposals.map((proposal) => proposal.gig.id);
    if (gigIds.length === 0) {
      return [];
    }
    // Obtenemos los gigs completos con sus relaciones
    const gigs = await this.gigRepository
      .createQueryBuilder("gig")
      .leftJoinAndSelect("gig.stages", "stages")
      .leftJoinAndSelect("gig.rewards", "rewards")
      .leftJoinAndSelect("gig.currentStage", "currentStage")
      .leftJoinAndSelect("gig.recruiter", "recruiter")
      .where("gig.id IN (:...gigIds)", { gigIds })
      .getMany();
    // Para cada gig, añadimos la información de la propuesta del freelancer
    const gigsWithProposalInfo = await Promise.all(
      gigs.map(async (gig) => {
        const proposal = proposals.find((p) => p.gig.id === gig.id);
        // Obtenemos la propuesta completa con su estado
        const fullProposal = await this.proposalRepository.findOne({
          where: { id: proposal?.id },
          select: ["id", "price", "status", "createdAt"],
        });
        return {
          ...gig,
          myProposal: fullProposal,
        };
      })
    );

    return gigsWithProposalInfo;
  }

  async getGigById(gigId: string): Promise<Gig | null> {
    const gig = await this.gigRepository.findOne({
      where: { id: gigId },
      relations: ["stages", "rewards", "currentStage", "recruiter"],
    });

    if (gig && gig.stages) {
      gig.stages.sort((a, b) => a.order - b.order);
    }

    return gig;
  }

  async updateGig(
    gigId: string,
    recruiterId: string,
    updateGigDto: CreateGigDto
  ): Promise<Gig> {
    const gig = await this.gigRepository.findOne({
      where: { id: gigId, recruiter: { id: recruiterId } },
      relations: ["stages", "rewards"],
    });

    if (!gig) {
      throw new Error(
        "Gig not found or you do not have permission to update it"
      );
    }

    gig.title = updateGigDto.title;
    gig.description = updateGigDto.description;
    gig.type = updateGigDto.type as GigType;
    gig.isAnonymous = updateGigDto.isAnonymous || false;
    gig.budgetMin = updateGigDto.budgetMin;
    gig.budgetMax = updateGigDto.budgetMax;
    gig.flashDeadline = updateGigDto.flashDeadline;
    gig.requiresTeam = updateGigDto.requiresTeam || false;

    await this.gigRepository.save(gig);

    if (updateGigDto.stages && updateGigDto.stages.length > 0) {
      if (gig.stages && gig.stages.length > 0) {
        await this.stageRepository.remove(gig.stages);
      }

      const stages = updateGigDto.stages.map((stageDto) => {
        const stage = new GigStage();
        stage.gig = gig;
        stage.name = stageDto.name;
        stage.description = stageDto.description;
        stage.payment = stageDto.payment;
        stage.order = stageDto.order;
        return stage;
      });

      const savedStages = await this.stageRepository.save(stages);

      const initialStage =
        savedStages.find((stage) => stage.order === 1) || savedStages[0];
      gig.currentStage = initialStage;
      await this.gigRepository.save(gig);
    }

    if (updateGigDto.rewards && updateGigDto.rewards.length > 0) {
      if (gig.rewards && gig.rewards.length > 0) {
        await this.rewardRepository.remove(gig.rewards);
      }

      const rewards = updateGigDto.rewards.map((rewardDto) => {
        const reward = new GigReward();
        reward.gig = gig;
        reward.name = rewardDto.name;
        reward.description = rewardDto.description;
        reward.amount = rewardDto.amount;
        reward.criteria = rewardDto.criteria;
        return reward;
      });

      await this.rewardRepository.save(rewards);
    }

    return this.gigRepository.findOne({
      where: { id: gigId },
      relations: ["stages", "rewards", "currentStage"],
    }) as Promise<Gig>;
  }

  async deleteGig(gigId: string, recruiterId: string): Promise<boolean> {
    const gig = await this.gigRepository.findOne({
      where: { id: gigId, recruiter: { id: recruiterId } },
    });

    if (!gig) {
      throw new Error(
        "Gig not found or you do not have permission to delete it"
      );
    }

    await this.gigRepository.remove(gig);
    return true;
  }

  /** Stages */
  async getGigStages(gigId: string): Promise<GigStage[]> {
    try {
      const stages = await this.stageRepository.find({
        where: { gig: { id: gigId } },
        order: { order: 'ASC' }
      });
      
      return stages;
    } catch (error) {
      console.error('Error fetching gig stages:', error);
      throw error;
    }
  }

  async getGigStageById(gigId: string, stageId: string): Promise<GigStage> {
    try {
      const stage = await this.stageRepository.findOne({
        where: {
          id: stageId,
          gig: { id: gigId },
        },
      });

      if (!stage) {
        throw new Error("Stage not found");
      }

      return stage;
    } catch (error) {
      console.error("Error fetching gig stage:", error);
      throw error;
    }
  }

  async createGigStage(gigId: string, stageData: any): Promise<GigStage> {
    try {
      const gig = await this.gigRepository.findOne({
        where: { id: gigId },
        relations: ["stages"],
      });
  
      if (!gig) {
        throw new Error("Gig not found");
      }
  
      // Calcular automáticamente el orden basado en las etapas existentes
      let nextOrder = 1;
      if (gig.stages && gig.stages.length > 0) {
        // Encontrar el orden más alto y añadir 1
        nextOrder = Math.max(...gig.stages.map(stage => stage.order)) + 1;
      }
  
      const newStage = new GigStage();
      newStage.gig = gig;
      newStage.name = stageData.name;
      newStage.description = stageData.description;
      newStage.payment = stageData.payment;
      newStage.order = nextOrder; // Asignar el orden calculado automáticamente
      newStage.isCompleted = false;
  
      const savedStage = await this.stageRepository.save(newStage);
  
      return savedStage;
    } catch (error) {
      console.error("Error creating gig stage:", error);
      throw error;
    }
  }

  async updateGigStage(gigId: string, stageId: string, stageData: any): Promise<GigStage> {
    try {
      if (!stageData) {
        throw new Error('Stage data is required');
      }
  
      const stage = await this.stageRepository.findOne({
        where: { 
          id: stageId,
          gig: { id: gigId }
        }
      });
      
      if (!stage) {
        throw new Error('Stage not found');
      }
      
      // Actualizar solo los campos proporcionados
      if (stageData.name !== undefined) stage.name = stageData.name;
      if (stageData.description !== undefined) stage.description = stageData.description;
      if (stageData.payment !== undefined) stage.payment = stageData.payment;
      if (stageData.order !== undefined) stage.order = stageData.order;
      if (stageData.isCompleted !== undefined) stage.isCompleted = stageData.isCompleted;
      
      const updatedStage = await this.stageRepository.save(stage);
      
      return updatedStage;
    } catch (error) {
      console.error('Error updating gig stage:', error);
      throw error;
    }
  }

  async deleteGigStage(gigId: string, stageId: string): Promise<boolean> {
    try {
      const stage = await this.stageRepository.findOne({
        where: {
          id: stageId,
          gig: { id: gigId },
        },
      });

      if (!stage) {
        throw new Error("Stage not found");
      }

      await this.stageRepository.remove(stage);

      // Reordenar las etapas restantes si es necesario
      const remainingStages = await this.stageRepository.find({
        where: { gig: { id: gigId } },
        order: { order: "ASC" },
      });

      if (remainingStages.length > 0) {
        // Actualizar el orden si es necesario
        for (let i = 0; i < remainingStages.length; i++) {
          if (remainingStages[i].order !== i + 1) {
            remainingStages[i].order = i + 1;
            await this.stageRepository.save(remainingStages[i]);
          }
        }
      }

      return true;
    } catch (error) {
      console.error("Error deleting gig stage:", error);
      throw error;
    }
  }

  async reorderGigStages(gigId: string, stagesOrder: { id: string, order: number }[]): Promise<void> {
    try {
      // Verificar que todas las etapas pertenecen al gig
      for (const stageOrder of stagesOrder) {
        const stage = await this.stageRepository.findOne({
          where: { 
            id: stageOrder.id,
            gig: { id: gigId }
          }
        });
        
        if (!stage) {
          throw new Error(`Stage with id ${stageOrder.id} not found or does not belong to this gig`);
        }
        
        // Actualizar el orden
        stage.order = stageOrder.order;
        await this.stageRepository.save(stage);
      }
    } catch (error) {
      console.error('Error reordering gig stages:', error);
      throw error;
    }
  }
}
