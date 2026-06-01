import { Router } from 'express'

import { createApplication } from '../controllers/applications.controller.ts'
import { createApplicationSchema } from '../zod/applications.schema.ts'
import { validateBody } from '../middlewares/validation.ts'

const applicationsRoute = Router()

applicationsRoute.post('/', validateBody(createApplicationSchema), createApplication)

export default applicationsRoute