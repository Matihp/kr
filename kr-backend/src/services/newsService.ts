import { AppDataSource } from '../config/data-source';
import { News } from '../models/newsModel';
import { CreateNewsDto, NewsResponseDto, UpdateNewsDto } from '../dtos/newsDto';
import { NotFoundError } from '../utils/errorUtils';
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

export class NewsService {
  private newsRepository = AppDataSource.getRepository(News);

  async findAll(page: number, limit: number): Promise<{ news: NewsResponseDto[], total: number, pages: number }> {
    const offset = (page - 1) * limit;
    const [news, total] = await this.newsRepository.findAndCount({
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

    return {
      news,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<News> {
    const news = await this.newsRepository.findOne({
      where: { id },
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
      throw new NotFoundError('News not found');
    }

    return news;
  }

  async create(dto: CreateNewsDto): Promise<NewsResponseDto> {
    try {
      const newNews = this.newsRepository.create(dto);
      const savedNews = await this.newsRepository.save(newNews);
      return {
        id: savedNews.id,
        title: savedNews.title,
        content: savedNews.content,
        author: savedNews.author,
        image: savedNews.image,
        createdAt: savedNews.createdAt,
        updatedAt: savedNews.updatedAt,
      };
    } catch (error: any) {
      throw error;
    }
  }

  async update(id: string, dto: UpdateNewsDto): Promise<NewsResponseDto> {
    const news = await this.findById(id);

    try {
      this.newsRepository.merge(news, dto);
      const updatedNews = await this.newsRepository.save(news);
      return {
        id: updatedNews.id,
        title: updatedNews.title,
        content: updatedNews.content,
        author: updatedNews.author,
        image: updatedNews.image,
        createdAt: updatedNews.createdAt,
        updatedAt: updatedNews.updatedAt,
      };
    } catch (error: any) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    const news = await this.findById(id);
    await this.newsRepository.remove(news);
  }
}
