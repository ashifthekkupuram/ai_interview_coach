import { z } from "zod"

export const createAnswerSchema = z.object({
    answerText: z.string('Answer required.'),
})