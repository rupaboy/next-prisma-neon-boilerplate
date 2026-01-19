import { z } from "zod"

export const createArticleSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  content: z.string().min(1),

  sectionId: z.number().int(),
  authorId: z.number().int(),

  layoutId: z.number().int().optional(),
  status: z.enum(["DRAFT", "REVIEW", "PUBLISHED", "ARCHIVED"]).optional(),

  excerpt: z.string().optional().nullable(),
  subtitle: z.string().optional().nullable(),
  highlight: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),

  tags: z.array(z.string()).optional(),
})
