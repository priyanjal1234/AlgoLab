import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { createProblem } from '../controllers/problem.controller.js'
const router = express.Router()

router.route("/create").post(authMiddleware,createProblem)

export default router