import type { NextFunction, Request, Response } from "express";

import { db } from "../db/connection.ts";
import { applications } from "../db/schema.ts";

export const createApplication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { jobDescription, resumeText } = req.body;

    const [application] = await db
      .insert(applications)
      .values({ jobDescription, resumeText })
      .returning();

    return res.status(201).json({
        message: 'Application created.',
        application
    })

  } catch (e) {
    next(e);
  }
};
