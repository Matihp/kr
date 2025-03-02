import { AppDataSource } from '../config/data-source';
import { CreateGigDto } from '../dtos/gigDto';
import { Gig } from '../models/gigModel';
import { GigReward } from '../models/gigRewardModel';
import { GigStage } from '../models/gigStageModel';
import { GigType } from '../types/gigTypes';

export class GigService {
  private gigRepository = AppDataSource.getRepository(Gig);
  private stageRepository = AppDataSource.getRepository(GigStage);
  private rewardRepository = AppDataSource.getRepository(GigReward);

  async createGig(recruiterId: string, createGigDto: CreateGigDto): Promise<Gig> {
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
      const stages = createGigDto.stages.map(stageDto => {
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
      const initialStage = savedStages.find(stage => stage.order === 1) || savedStages[0];
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
      const rewards = createGigDto.rewards.map(rewardDto => {
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
      relations: ['stages', 'rewards', 'currentStage']
    }) as Promise<Gig>;
  }

  async getGigs(filters: {
    type?: GigType;
    minBudget?: number;
    maxBudget?: number;
    requiresTeam?: boolean;
  }): Promise<Gig[]> {
    const queryBuilder = this.gigRepository
      .createQueryBuilder('gig')
      .leftJoinAndSelect('gig.stages', 'stages')
      .leftJoinAndSelect('gig.rewards', 'rewards')
      .leftJoinAndSelect('gig.currentStage', 'currentStage');
    if (filters.type) {
      queryBuilder.andWhere('gig.type = :type', { type: filters.type });
    }
    if (filters.minBudget) {
      queryBuilder.andWhere('gig.budgetMin >= :minBudget', { minBudget: filters.minBudget });
    }
    if (filters.maxBudget) {
      queryBuilder.andWhere('gig.budgetMax <= :maxBudget', { maxBudget: filters.maxBudget });
    }
    if (filters.requiresTeam !== undefined) {
      queryBuilder.andWhere('gig.requiresTeam = :requiresTeam', { requiresTeam: filters.requiresTeam });
    }
    return queryBuilder.getMany();
  }

  async getRecruiterGigs(recruiterId: string): Promise<Gig[]> {
    return this.gigRepository.find({
      where: { recruiter: { id: recruiterId } },
      relations: ['stages', 'rewards', 'currentStage'],
      order: { createdAt: 'DESC' }
    });
  }

  async getGigById(gigId: string): Promise<Gig | null> {
    return this.gigRepository.findOne({
      where: { id: gigId },
      relations: ['stages', 'rewards', 'currentStage', 'recruiter']
    });
  }

  async updateGig(gigId: string, recruiterId: string, updateGigDto: CreateGigDto): Promise<Gig> {
    // Check if gig exists and belongs to the recruiter
    const gig = await this.gigRepository.findOne({
      where: { id: gigId, recruiter: { id: recruiterId } },
      relations: ['stages', 'rewards']
    });

    if (!gig) {
      throw new Error('Gig not found or you do not have permission to update it');
    }

    // Update basic gig information
    gig.title = updateGigDto.title;
    gig.description = updateGigDto.description;
    gig.type = updateGigDto.type as GigType;
    gig.isAnonymous = updateGigDto.isAnonymous || false;
    gig.budgetMin = updateGigDto.budgetMin;
    gig.budgetMax = updateGigDto.budgetMax;
    gig.flashDeadline = updateGigDto.flashDeadline;
    gig.requiresTeam = updateGigDto.requiresTeam || false;

    // Save updated gig
    await this.gigRepository.save(gig);

    // Update stages if provided
    if (updateGigDto.stages && updateGigDto.stages.length > 0) {
      // Delete existing stages
      if (gig.stages && gig.stages.length > 0) {
        await this.stageRepository.remove(gig.stages);
      }

      // Create new stages
      const stages = updateGigDto.stages.map(stageDto => {
        const stage = new GigStage();
        stage.gig = gig;
        stage.name = stageDto.name;
        stage.description = stageDto.description;
        stage.payment = stageDto.payment;
        stage.order = stageDto.order;
        return stage;
      });

      const savedStages = await this.stageRepository.save(stages);
      
      // Update current stage
      const initialStage = savedStages.find(stage => stage.order === 1) || savedStages[0];
      gig.currentStage = initialStage;
      await this.gigRepository.save(gig);
    }

    // Update rewards if provided
    if (updateGigDto.rewards && updateGigDto.rewards.length > 0) {
      // Delete existing rewards
      if (gig.rewards && gig.rewards.length > 0) {
        await this.rewardRepository.remove(gig.rewards);
      }

      // Create new rewards
      const rewards = updateGigDto.rewards.map(rewardDto => {
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

    // Return updated gig with relations
    return this.gigRepository.findOne({
      where: { id: gigId },
      relations: ['stages', 'rewards', 'currentStage']
    }) as Promise<Gig>;
  }

  async deleteGig(gigId: string, recruiterId: string): Promise<boolean> {
    // Check if gig exists and belongs to the recruiter
    const gig = await this.gigRepository.findOne({
      where: { id: gigId, recruiter: { id: recruiterId } }
    });

    if (!gig) {
      throw new Error('Gig not found or you do not have permission to delete it');
    }

    // Delete the gig
    await this.gigRepository.remove(gig);
    return true;
  }

  async updateGigStage(gigId: string, stageId: string, completed: boolean): Promise<GigStage> {
    const stage = await this.stageRepository.findOne({
      where: { id: stageId, gig: { id: gigId } }
    });

    if (!stage) {
      throw new Error('Stage not found');
    }

    stage.isCompleted = completed;
    return this.stageRepository.save(stage);
  }
}