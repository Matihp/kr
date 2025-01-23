import { AppDataSource } from '../config/data-source';
import { Skill } from '../models/skillModel';
import { CreateSkillDto, SkillResponseDto, UpdateSkillDto } from '../dtos/skillDto';
import { NotFoundError } from '../utils/errorUtils';

export class SkillService {
  private skillRepository = AppDataSource.getRepository(Skill);

  async findAll(): Promise<SkillResponseDto[]> {
    const skills = await this.skillRepository.find({
      order: {
        name: 'ASC'
      }
    });
    return skills;
  }

  async findById(id: string): Promise<Skill> {
    const skill = await this.skillRepository.findOne({
      where: { id },
    });
  
    if (!skill) {
      throw new NotFoundError('Skill no encontrada');
    }
  
    return skill;
  }

  async create(dto: CreateSkillDto): Promise<SkillResponseDto> {
    try {
      const newSkill = this.skillRepository.create(dto);
      return await this.skillRepository.save(newSkill);
    } catch (error: any) {
      if (error.code === '23505') { // Código de PostgreSQL para violación de unique
        throw new Error('Ya existe una skill con ese nombre');
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateSkillDto): Promise<SkillResponseDto> {
    const skill = await this.findById(id);
    
    try {
      this.skillRepository.merge(skill, dto);
      return await this.skillRepository.save(skill);
    } catch (error: any) {
      if (error.code === '23505') {
        throw new Error('Ya existe una skill con ese nombre');
      }
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    const skill = await this.findById(id);
    await this.skillRepository.remove(skill);
  }
}