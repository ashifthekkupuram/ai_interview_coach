import { z } from "zod"

export const createApplicationSchema = z.object({
    jobDescription: z.string('Job Description required.'),
    resumeText: z.string('Resume required.'),
    company: z.string().max(255, 'Company characters cannot go above 255').optional(),
    jobTitle: z.string().max(255, 'Job title characters cannot go above 255').optional()
})