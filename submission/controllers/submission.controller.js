import axios from "axios";
import submissionQueue from "../queues/submissionQueue.js";
import submissionModel from "../models/submission.model.js";

export const createSubmission = async (req, res) => {
  try {
    const user = req.user.id || req.user.name;
    const { problemId } = req.params;
    const { code, language, languageId } = req.body;

    const submission = await submissionModel.create({
      user,
      problem: problemId,
      code,
      language,
      languageId,
    });

    await submissionQueue.add("evaluate", {
      submissionId: submission._id.toString(),
      code,
      language,
      languageId,
      problemId,
    });

    return res.status(201).json({
      message: "Submission created and queued for evaluation",
      submissionId: submission._id,
    });
  } catch (error) {
    console.error("Error creating submission:", error);
    return res.status(500).json({
      message: error.message || "Error creating submission",
    });
  }
};

export const getSubmission = async function (req, res) {
  try {
    let { submissionId } = req.params;
    let submission = await submissionModel.findOne({ _id: submissionId });
    if (!submission)
      return res.status(404).json({ message: "Submission not found" });
    return res.status(200).json(submission);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error getting submission",
    });
  }
};
