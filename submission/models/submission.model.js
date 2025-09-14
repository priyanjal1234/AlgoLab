import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  input: String,
  expected: String,
  got: String,
  status: { type: String, enum: ["passed", "failed"], default: "failed" },
});

const submissionSchema = new mongoose.Schema(
  {
    user: { type: String, required: true }, 
    problem: { type: String, required: true }, 
    code: { type: String, required: true },
    language: { type: String, required: true },
    languageId: { type: Number, required: true }, 
    status: {
      type: String,
      enum: ["pending", "accepted", "failed", "error"],
      default: "pending",
    },
    results: [resultSchema],
  },
  { timestamps: true }
);

const submissionModel = mongoose.model("submission", submissionSchema);

export default submissionModel;
