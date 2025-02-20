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
    if (createGigDto.stages) {
      const stages = createGigDto.stages.map(stageDto => {
        const stage = new GigStage();
        stage.gig = savedGig;
        stage.name = stageDto.name;
        stage.description = stageDto.description;
        stage.payment = stageDto.payment;
        stage.order = stageDto.order;
        return stage;
      });
      await this.stageRepository.save(stages);
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
      relations: ['stages', 'rewards']
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
      .leftJoinAndSelect('gig.rewards', 'rewards');

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