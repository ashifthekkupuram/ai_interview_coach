import { Router } from 'express'

import { createAnswer } from '../controllers/answers.controller.ts'
import { validateBody } from '../middlewares/validation.ts'
import { createAnswerSchema } from '../zod/answers.schema.ts'

const answersRoute = Router()

answersRoute.post('/:questionId', validateBody(createAnswerSchema), createAnswer)

export default answersRoute