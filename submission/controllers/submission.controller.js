import axios from "axios";
import submissionQueue from "../queues/submissionQueue.js";
import submissionModel from "../models/submission.model.js";

export const createSubmission = async (req, res) => {
    try {
        const user = req.user.id;
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
            status: submission.status,
        });
    } catch (error) {
        console.error("Error creating submission:", error);
        return res.status(500).json({
            message: error.message || "Error creating submission",
        });
    }
};
