import { z } from 'zod';

const languageSchema = z.object({
  id: z.string().uuid().optional(),
  language: z.string().min(1).max(100),
  level: z.string().min(1).max(50)
});

const skillSchema = z.string().min(1).max(100);

const projectSchema = z.object({
    id: z.string().uuid().optional(),
    title: z.string().min(1).max(200),
    role: z.string().min(1).max(100),
    description: z.string().min(1).max(1000),
    likes: z.number().int().min(0).optional(),
    images: z.array(z.string().url()).optional(),
    website: z.string().url().optional().nullable(),
    // Hacemos el repository más flexible
    repository: z.string().url().optional().nullable()
      .or(z.string().min(1).max(255)), // Permite URLs o strings normales
    // Hacemos skills opcional
    skills: z.array(skillSchema).optional().default([])
  });

const certificationSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(200),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  url: z.string().url().optional().nullable(),
  description: z.string().min(1).max(1000)
});

// Esquema principal del perfil
export const profileDataSchema = z.object({
  description: z.string().min(1).max(2000).optional(),
  avatarSrc: z.string().optional(),
  languages: z.array(languageSchema).optional(),
  skills: z.array(skillSchema).optional(),
  projects: z.array(projectSchema).optional(),
  certifications: z.array(certificationSchema).optional()
});

export type ProfileDataSchema = z.infer<typeof profileDataSchema>;