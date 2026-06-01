import type { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";

export const validateBody = <T>(schema: ZodType<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next()
    } catch (e) {
      if (e instanceof ZodError) {
        return res.status(400).json({
          error: "Validation Error.",
          details: e.issues.map((err) => ({
            name: err.path.join("."),
            message: err.message,
          })),
        });
      }
      next(e);
    }
  };
};
