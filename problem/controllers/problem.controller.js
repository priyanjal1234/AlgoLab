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
        return res.status(400).json({ message: "All fields are required and must be valid" });
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
