import { z } from 'zod';
import type { Request, Response, NextFunction } from 'express';

const userIdSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a positive number'),
});

const requiredUserDataSchema = z.object({
  username: z
    .string('Username must be a string.')
    .min(2, 'Username must be at least 2 characters')
    .max(50, 'Username must not exceed 50 characters'),
  email: z.email('Email must be a valid email'),
});

const partialUserDataschema = z.object({
  username: z
    .string()
    .min(2, 'Username must be at least 2 characters')
    .max(50, 'Username mest not exceed 50 characters')
    .optional(),
  email: z.email('Email must be a valid email').optional(),
});

export const validateRequiredUserData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = requiredUserDataSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      details: result.error.issues.map((issue) => issue.message),
    });
  }
  next();
};

export const validateUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = userIdSchema.safeParse(req.params);

  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      details: result.error.issues.map((issue) => issue.message),
    });
  }
  next();
};

export const validatePartialUserData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = partialUserDataschema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      details: result.error.issues.map((issue) => issue.message),
    });
  }
  next();
};
