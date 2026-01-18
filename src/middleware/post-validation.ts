import { z } from "zod"; 
import type { Request, Response, NextFunction } from "express"; 

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  published: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});