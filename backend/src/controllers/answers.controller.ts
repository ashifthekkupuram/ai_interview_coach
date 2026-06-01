import type { NextFunction, Request, Response } from "express";

import { db } from "../db/connection.ts";
import { answers, questions, sessions } from "../db/schema.ts";
import { eq } from "drizzle-orm";
import { gradeAnswer } from "../services/groq.ts";

export const createAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { questionId } = req.params;
    const { answerText } = req.body;

    const question = await db.query.questions.findFirst({
      where: eq(questions.id, questionId as string),
      with: {
        session: { with: { application: true } },
        answers: true,
      },
    });

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    if (question.answers.length > 0) {
      return res.status(400).json({
        message: "Already answered",
      });
    }

    const answer = await gradeAnswer(
      answerText,
      question.questionText,
      question.session?.application?.jobDescription as string,
      question.id,
    );

    await db.insert(answers).values(answer);

    await db
      .update(sessions)
      .set({
        overallScore:
          question.session?.overallScore !== null &&
          question.session?.overallScore !== undefined &&
          typeof question.session.overallScore === "number"
            ? question.session?.overallScore + answer.score
            : answer.score,
      }).where(eq(sessions.id, question.sessionId as string));

    return res.json({
      message: "Answer created",
    });
  } catch (e) {
    next(e);
  }
};
