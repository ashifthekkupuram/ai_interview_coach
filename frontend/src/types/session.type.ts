export type AnswerType = {
  id: string;
  createdAt: Date;
  questionId: string | null;
  answerText: string;
  score: number | null;
  feedback: string | null;
  strengths: string | null;
  improvements: string | null;
};

export type QuestionType = {
  id: string;
  createdAt: Date;
  sessionId: string | null;
  questionText: string;
  category: string | null;
  orderIndex: number;
  answers: AnswerType[];
};

export type SessionType = {
  id: string;
  createdAt: Date;
  applicationId: string | null;
  status: "in_progress" | "completed" | null;
  overallScore: number | null;
  completedAt: Date | null;
  questions: QuestionType[];
};
