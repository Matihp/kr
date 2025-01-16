import { Request, Response } from "express";
import { News } from "../models/newsModel";
import { AppDataSource } from "../config/data-source";
import { handleError } from "../utils/errorUtils";
import { z } from "zod";

const newsRepository = AppDataSource.manager.getRepository(News);

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

export const getNews = async (req: Request, res: Response) => {
  try {
    const validationResult = paginationSchema.safeParse(req.query);
    if (!validationResult.success) {
      return res.status(400).json({ message: validationResult.error.errors });
    }

    const { page, limit } = validationResult.data;
    const offset = (page - 1) * limit;

    const [news, total] = await newsRepository.findAndCount({
      select: [
        "id",
        "title",
        "content",
        "author",
        "image",
        "createdAt",
      ],
      skip: offset,
      take: limit,
    });

    res.json({
      news,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getNewsById = async (req: Request, res: Response) => {
  try {
    const news = await newsRepository.findOne({
      where: { id: req.params.id },
      select: [
        "id",
        "title",
        "content",
        "author",
        "image",
        "createdAt",
        "updatedAt",
      ],
    });
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.json(news);
  } catch (error) {
    handleError(error, res);
  }
};

export const createNews = async (req: Request, res: Response) => {
  try {
    const newNews = newsRepository.create(req.body);
    const result = await newsRepository.save(newNews);
    res.json(result);
  } catch (error) {
    handleError(error, res);
  }
};

export const updateNews = async (req: Request, res: Response) => {
  try {
    const news = await newsRepository.findOne({ where: { id: req.params.id } });

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    newsRepository.merge(news, req.body);
    const result = await newsRepository.save(news);
    res.json(result);
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteNews = async (req: Request, res: Response) => {
  try {
    const news = await newsRepository.findOne({ where: { id: req.params.id } });

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    await newsRepository.remove(news);
    res.json({ message: "News deleted successfully" });
  } catch (error) {
    handleError(error, res);
  }
};
