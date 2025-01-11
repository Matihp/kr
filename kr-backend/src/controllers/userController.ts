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
});

export const getUsers = async (req: Request, res: Response) => {
  try {
    const validationResult = paginationSchema.safeParse(req.query);
    if (!validationResult.success) {
      return res.status(400).json({ message: validationResult.error.errors });
    }

    const { page, limit } = validationResult.data;
    const offset = (page - 1) * limit;

    const [users, total] = await userRepository.findAndCount({
      select: [
        "id",
        "firstName",
        "lastName",
        "email",
        "createdAt",
        "skills",
      ],
      skip: offset,
      take: limit,
    });

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
