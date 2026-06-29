import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(3).max(160),
  slug: z.string().min(3).max(180).regex(/^[a-z0-9-]+$/),
  excerpt: z.string().min(20).max(300),
  content: z.string().min(40),
  category: z.string().min(2).max(60),
  coverImage: z.string().optional().nullable(),
  status: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED", "ARCHIVED"]),
  scheduledAt: z.string().datetime().optional().nullable()
});

export const achievementSchema = z.object({
  title: z.string().min(3).max(160),
  slug: z.string().min(3).max(180).regex(/^[a-z0-9-]+$/),
  category: z.string().min(2).max(60),
  summary: z.string().min(20).max(600),
  image: z.string().optional().nullable(),
  status: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED", "ARCHIVED"]),
  awardedAt: z.string().datetime().optional().nullable()
});

export const inquirySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(8).max(20),
  message: z.string().min(10).max(1000)
});

export const homepageSectionSchema = z.object({
  key: z.string().min(2).max(80),
  title: z.string().min(2).max(160),
  body: z.string().min(10),
  image: z.string().optional().nullable(),
  order: z.number().int().min(0),
  enabled: z.boolean()
});
