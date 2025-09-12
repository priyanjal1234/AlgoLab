import problemModel from "../models/problem.model.js";

export const createProblem = async function (req, res) {
  try {
    let {
      title,
      slug,
      description,
      difficulty,
      tags,
      constraints,
      examples,
      testCases,
    } = req.body;

    if (
      !title ||
      !slug ||
      !description ||
      !difficulty ||
      !Array.isArray(tags) ||
      !Array.isArray(constraints) ||
      !Array.isArray(examples) ||
      !Array.isArray(testCases)
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required and must be valid" });
    }

    let problem = await problemModel.findOne({
      $or: [{ slug: slug }, { title: title }],
    });

    if (problem) {
      return res.status(409).json({ message: "This problem already exists" });
    }
    
    problem = await problemModel.create({
      createdBy: req.user.id,
      title,
      slug,
      description,
      difficulty,
      tags,
      constraints,
      examples,
      testCases,
    });

    return res.status(201).json({ message: "Problem created successfully" });
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : `Error in creating the problem: ${error}`,
    });
  }
};

export const getAllProblems = async function (req, res) {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    let skip = (page - 1) * limit;

    let problems = await problemModel.find().skip(skip).limit(limit);

    return res.status(200).json(problems);
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : `Error getting the problems: ${error}`,
    });
  }
};

export const getProblemDetails = async function (req, res) {
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
          : `Error getting problem details: ${error}`,
    });
  }
};

export const getProblemsByCategory = async function (req, res) {
  try {
    let { category } = req.params;
    let { page, limit } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    let skip = (page - 1) * limit;

    let filter = {
      $or: [{ difficulty: category }, { tags: category }],
    };

    let problems = await problemModel.find(filter).skip(skip).limit(limit);

    return res.status(200).json(problems);
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : `Error getting problems by category: ${error}`,
    });
  }
};
