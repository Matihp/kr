// src/seeds/seedRolesToUsers.ts
import { AppDataSource } from '../config/data-source';
import { User } from '../models/userModel';
import { Role } from '../models/roleModel';
import { RoleType } from '../models/roleModel';

async function seedRolesToUsers() {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.manager.getRepository(User);
  const roleRepository = AppDataSource.manager.getRepository(Role);

  // Crear roles si no existen
  let userRole = await roleRepository.findOne({ where: { type: RoleType.USER } });
  if (!userRole) {
    userRole = await roleRepository.save({ type: RoleType.USER });
  }

  let adminRole = await roleRepository.findOne({ where: { type: RoleType.ADMIN } });
  if (!adminRole) {
    adminRole = await roleRepository.save({ type: RoleType.ADMIN });
  }

  // Asignar roles a usuarios existentes
  const users = await userRepository.find();
  for (const user of users) {
    // Asigna el rol de usuario a todos los usuarios existentes
    user.role = userRole;
    await userRepository.save(user);
  }

  console.log('Roles assigned to users successfully');
}

seedRolesToUsers().catch(error => console.log(error));
