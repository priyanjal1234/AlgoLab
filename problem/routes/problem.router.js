import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { createProblem, getAllProblems, getProblemDetails, getProblemsByCategory } from '../controllers/problem.controller.js'
const router = express.Router()

router.route("/create").post(authMiddleware,createProblem)

router.route("/all-problems").get(getAllProblems)

router.route("/problem/:problemId").get(authMiddleware,getProblemDetails)

router.route("/cat-problems/:category").get(getProblemsByCategory)

export default router