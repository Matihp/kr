import { Request, Response } from 'express';
import { NewsService } from '../services/newsService';
import { plainToInstance } from 'class-transformer';
import { NotFoundError, handleError } from '../utils/errorUtils';
import { CreateNewsDto, UpdateNewsDto } from '../dtos/newsDto';
import { z } from 'zod';

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

export class NewsController {
  private newsService: NewsService;

  constructor() {
    this.newsService = new NewsService();
  }

  public getNews = async (req: Request, res: Response) => {
    try {
      const validationResult = paginationSchema.safeParse(req.query);
      if (!validationResult.success) {
        return res.status(400).json({ message: validationResult.error.errors });
      }

      const { page, limit } = validationResult.data;
      const { news, total, pages } = await this.newsService.findAll(page, limit);

      res.json({
        news,
        total,
        page,
        limit,
        pages,
      });
    } catch (error) {
      handleError(error, res);
    }
  };

  public getNewsById = async (req: Request, res: Response) => {
    try {
      const news = await this.newsService.findById(req.params.id);
      res.json(news);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      handleError(error, res);
    }
  };

  public createNews = async (req: Request, res: Response) => {
    try {
      const dto = plainToInstance(CreateNewsDto, req.body);
      const news = await this.newsService.create(dto);
      res.status(201).json(news);
    } catch (error) {
      handleError(error, res);
    }
  };

  public updateNews = async (req: Request, res: Response) => {
    try {
      const dto = plainToInstance(UpdateNewsDto, req.body);
      const news = await this.newsService.update(req.params.id, dto);
      res.json(news);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      handleError(error, res);
    }
  };

  public deleteNews = async (req: Request, res: Response) => {
    try {
      await this.newsService.delete(req.params.id);
      res.json({ message: 'News deleted successfully' });
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      handleError(error, res);
    }
  };
}