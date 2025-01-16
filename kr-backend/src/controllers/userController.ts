import { Request, Response } from "express";
import { User } from "../models/userModel";
import { AppDataSource } from "../config/data-source";
import { handleError } from "../utils/errorUtils";
import { z } from "zod";

const userRepository = AppDataSource.manager.getRepository(User);

const paginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 18)),
  skillName: z.string().optional(),
});

export const getUsers = async (req: Request, res: Response) => {
  try {
    const validationResult = paginationSchema.safeParse(req.query);
    if (!validationResult.success) {
      return res.status(400).json({ message: validationResult.error.errors });
    }

    const { page, limit, skillName } = validationResult.data;
    const skills = skillName ? skillName.split(',') : [];
    const offset = (page - 1) * limit;

    let query = userRepository.createQueryBuilder("user")
      .leftJoinAndSelect("user.skills", "skill")
      .leftJoinAndSelect("user.role", "role")
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

    if (skills.length > 0) {
      // Cambiamos a OR en lugar de AND
      query = query
        .andWhere("skill.name IN (:...names)", { names: skills })
        .groupBy("user.id")
        .addGroupBy("skill.id")
        .addGroupBy("role.id");
      // Removemos el HAVING ya que no necesitamos que tenga todas las skills
    }

    // Aplicamos la paginación después del filtrado
    const [users, total] = await query
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    res.json({
      users,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOne({
      where: { id: req.params.id },
      select: [
        "id",
        "firstName",
        "lastName",
        "email",
        "createdAt",
        "updatedAt",
      ],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    handleError(error, res);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId; // ID del usuario autenticado
    const user = await userRepository.findOne({ where: { id: req.params.id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.id !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    userRepository.merge(user, req.body);
    const result = await userRepository.save(user);
    res.json(result);
  } catch (error) {
    handleError(error, res);
  }
};

