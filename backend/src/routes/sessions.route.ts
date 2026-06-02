import { Router } from 'express'

import { createSession, getSession } from '../controllers/sessions.controller.ts'

const sessionsRoute = Router()

sessionsRoute.get("/:id", getSession)
sessionsRoute.post("/:applicationId", createSession)

export default sessionsRoute