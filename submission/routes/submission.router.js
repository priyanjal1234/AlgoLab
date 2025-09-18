import express from 'express'
import { createSubmission, getSubmission } from '../controllers/submission.controller.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route("/create/:problemId").post(authMiddleware,createSubmission)

router.route("/submission/:submissionId").get(authMiddleware,getSubmission)

export default router