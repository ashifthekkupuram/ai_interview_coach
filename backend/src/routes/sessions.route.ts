import { Router } from 'express'

import { createSession } from '../controllers/sessions.controller.ts'

const sessionsRoute = Router()

sessionsRoute.post("/:applicationId", createSession)

export default sessionsRoute