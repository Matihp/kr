import { AppDataSource } from '../config/data-source';
import { User } from '../models/userModel';
import { CreateUserDto, UserResponseDto } from '../dtos/userDto';
import { NotFoundError } from '../utils/errorUtils';
import bcrypt from 'bcrypt';
import { Role, RoleType } from '../models/roleModel';

export class AdminService {
  private userRepository = AppDataSource.getRepository(User);
  private roleRepository = AppDataSource.getRepository(Role);

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    const { firstName, lastName, email, password } = dto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const role = await this.roleRepository.findOne({
      where: { type: RoleType.USER }
    });

    if (!role) {
      throw new Error('Role configuration error');
    }

    const user = this.userRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role
    });

    const savedUser = await this.userRepository.save(user);
    return {
      id: savedUser.id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    };
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    await this.userRepository.remove(user);
  }
}
