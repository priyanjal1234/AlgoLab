import axios from "axios";
import submissionQueue from "../queues/submissionQueue.js";
import submissionModel from "../models/submission.model.js";

export const createSubmission = async (req, res) => {
  try {
    const user = req.user.id; // comes from auth middleware
    const { problemId } = req.params;
    const { code, language, languageId } = req.body;

    // 1. Create submission with "pending" status
    const submission = await submissionModel.create({
      user,
      problem: problemId,
      code,
      language,
      languageId,
    });

    // 2. Add job to queue for async evaluation
    await submissionQueue.add("evaluate", {
      submissionId: submission._id.toString(),
      code,
      language,
      languageId,
      problemId,
    });

    // 3. Respond immediately
    return res.status(201).json({
      message: "Submission created and queued for evaluation",
      submissionId: submission._id,
      status: submission.status,
    });
  } catch (error) {
    console.error("Error creating submission:", error);
    return res.status(500).json({
      message: error.message || "Error creating submission",
    });
  }
};
