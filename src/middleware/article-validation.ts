import { z } from "zod"; 
import type { Request, Response, NextFunction } from "express"; 


const articleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body is required"),
  category: z.enum(["news", "sports", "culture", "technology"], "Category must be one of: news, sports, culture, or technology" ),
});


export const validateArticleData = (
    req: Request, res: Response, next: NextFunction
) => {
const result = articleSchema.safeParse(req.body);

if(!result.success) {
    return res.status(400).json({
        error: "Validation failed", 
        details: result.error.issues.map((issue) => issue.message), 
    });
}
next(); 
}; 