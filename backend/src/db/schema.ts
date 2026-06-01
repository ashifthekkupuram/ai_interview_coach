import { relations } from "drizzle-orm";
import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";

export const applications = pgTable("applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  jobTitle: varchar("job_title", { length: 255 }),
  company: varchar("company", { length: 255 }),
  jobDescription: text("job_description").notNull(),
  resumeText: text("resume_text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const sessionStatus = pgEnum("session_status", [
  "in_progress",
  "completed",
]);

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  applicationId: uuid("application_id").references(() => applications.id, {
    onDelete: "cascade",
  }),
  status: sessionStatus().default("in_progress"),
  overallScore: integer("overall_score"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export const questions = pgTable("questions", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: uuid("session_id").references(() => sessions.id, {
    onDelete: "cascade",
  }),
  questionText: text("question_text").notNull(),
  category: varchar("category", { length: 50 }),
  orderIndex: integer("order_index").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const answers = pgTable("answers", {
  id: uuid("id").primaryKey().defaultRandom(),
  questionId: uuid("question_id").references(() => questions.id, {
    onDelete: "cascade",
  }),
  answerText: text("answer_text").notNull(),
  score: integer("score"),
  feedback: text("feedback"),
  strengths: text("strengths"),
  improvements: text("improvements"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const applicationRelations = relations(applications, ({ many }) => ({
  sessions: many(sessions),
}));

export const sessionRelations = relations(sessions, ({ one, many }) => ({
  application: one(applications, {
    fields: [sessions.applicationId],
    references: [applications.id],
  }),
  questions: many(questions),
}));

export const questionRelations = relations(questions, ({ one, many }) => ({
  session: one(sessions, {
    fields: [questions.sessionId],
    references: [sessions.id],
  }),
  answers: many(answers),
}));

export const answerRelations = relations(answers, ({ one }) => ({
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
  }),
}));
