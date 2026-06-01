import type { NextFunction, Request, Response } from "express";

import { db } from "../db/connection.ts";
import { sessions, applications, questions } from "../db/schema.ts";
import { eq } from "drizzle-orm";
import { generateQuestions } from "../services/groq.ts";

export const createSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { applicationId } = req.params;

    const [application] = await db
      .select()
      .from(applications)
      .where(eq(applications.id, applicationId as string));

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    const session = await db.transaction(async (tx) => {
      const [session] = await tx
        .insert(sessions)
        .values({ applicationId: application.id })
        .returning();

      if (!session) {
        return res.status(400).json({
          message: "Session creation failed",
        });
      }

      const generatedQuestions = await generateQuestions(
        application.jobDescription,
        application.resumeText,
        session.id,
      );

      await tx.insert(questions).values(generatedQuestions.questions);

      return session;
    });

    return res.status(201).json({
      message: "Session created.",
      session,
    });
  } catch (e) {
    next(e);
  }
};

export const getSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const session = await db.query.sessions.findFirst({
      where: eq(sessions.id, id as string),
      with: {
        questions: {
          with: {
            answers: true
          }
        }
      }
    })

    if (!session) {
        return res.status(400).json({
          message: "Session creation failed",
        });
      }

      return res.json({
        message: "Session Retrieved",
        session
      })

  } catch (e) {
    next(e);
  }
};
