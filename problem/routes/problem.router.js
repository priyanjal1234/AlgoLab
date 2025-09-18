import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createProblem,
  getAllProblems,
  getProblemDetails,
  getProblemsByCategory,
} from "../controllers/problem.controller.js";
import problemModel from "../models/problem.model.js";
const router = express.Router();

router.route("/create").post(authMiddleware, createProblem);

router.route("/all-problems").get(getAllProblems);

router.route("/problem/:slug").get(authMiddleware, getProblemDetails);

router.route("/cat-problems/:category").get(getProblemsByCategory);

router.route("/internal/:problemId").get(async function (req, res) {
  try {
    let { problemId } = req.params;
    let problem = await problemModel.findOne({ _id: problemId });
    if (!problem)
      return res
        .status(404)
        .json({ message: "Problem with this id not found" });
    return res.status(200).json(problem);
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : `Error getting problem: ${error}`,
    });
  }
});

export default router;
