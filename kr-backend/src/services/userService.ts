import { AppDataSource } from '../config/data-source';
import { User } from '../models/userModel';
import { NotFoundError } from '../utils/errorUtils';
import { UpdateUserDto, UserResponseDto } from '../dtos/userDto';
import { Onboarding, UserType } from '../models/onboardingModel';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async findAll(page: number, limit: number, skillName?: string, userType?: UserType): Promise<{ users: UserResponseDto[], total: number, pages: number }> {
    const skills = skillName ? skillName.split(',') : [];
    const offset = (page - 1) * limit;

    let query = this.userRepository.createQueryBuilder("user")
      .leftJoinAndSelect("user.skills", "skill")
      .leftJoinAndSelect("user.role", "role")
      .leftJoinAndSelect("onboarding", "onboarding", "onboarding.userId = user.id")
      .select([
        "user.id",
        "user.firstName",
        "user.lastName",
        "user.description",
        "user.avatarSrc",
        "user.email",
        "user.createdAt",
        "skill.id",
        "skill.name",
        "role"
      ]);

    if (userType) {
      query = query.andWhere("onboarding.userType = :userType", { userType });
    }

    if (skills.length > 0) {
      query = query
        .andWhere("skill.name IN (:...names)", { names: skills })
        .groupBy("user.id")
        .addGroupBy("skill.id")
        .addGroupBy("role.id");
    }

    const [users, total] = await query
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    return {
      users,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: [
        "id",
        "firstName",
        "lastName",
        "email",
        "description",
        "avatarSrc",
        "location",
      ],
      relations: [
        "levelProgress",
        "skills",
        "projects",
        "languages",
        "certifications"
      ],
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.findById(id);

    this.userRepository.merge(user, dto);
    const updatedUser = await this.userRepository.save(user);
    return {
      id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };
  }
}
