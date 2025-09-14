import express from 'express'
import { createSubmission } from '../controllers/submission.controller.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route("/create/:problemId").post(authMiddleware,createSubmission)

export default router