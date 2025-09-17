import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { Worker } from "bullmq";
import axios from "axios";
import IORedis from "ioredis";
import mongoose from "mongoose";
import submissionModel from "../models/submission.model.js";

// ================= Redis Connection =================
const connection = new IORedis({
  maxRetriesPerRequest: null, // ✅ Required for BullMQ
});

connection.on("connect", () => console.log("✅ Redis connected in worker"));
connection.on("error", (err) =>
  console.error("❌ Redis connection error:", err.message)
);

// ================= MongoDB Connection =================
async function connectDB() {
  try {
    const conn = await mongoose.connect(String(process.env.MONGODB_URI));
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
}
connectDB();

// ================= Constants =================
const JUDGE0_URL = "https://algolab.skillify-lms.xyz"; // Your Judge0 base URL
const PROBLEM_SERVICE = "http://localhost:3000/api/problems"; // Gateway URL

// ================= Helpers =================
function getLanguageId(language, fallbackId) {
  if (fallbackId) return fallbackId;
  const map = {
    C: 50,
    "C++": 54,
    Java: 62,
    Javascript: 63,
    Python: 71,
  };
  return map[language] || 71;
}

// ================= Worker =================
const codeWorker = new Worker(
  "submission",
  async (job) => {
    console.log(`🚀 Processing submission ${job.data.submissionId}`);

    const { submissionId, code, language, languageId, problemId } = job.data;

    // ---------- Step 1: Fetch problem test cases ----------
    let testCases = [];
    try {
      const response = await axios.get(
        `${PROBLEM_SERVICE}/internal/${problemId}`
      );
      testCases = response.data.testCases || [];
    } catch (err) {
      console.error("❌ Failed to fetch problem test cases:", err.message);
      await submissionModel.findByIdAndUpdate(submissionId, {
        status: "error",
      });
      return;
    }

    // ---------- Step 2: Run test cases on Judge0 ----------
    let allPassed = true;
    const results = [];

    for (const tc of testCases) {
      try {
        const judgeResponse = await axios.post(
          `${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`,
          {
            source_code: code,
            language_id: getLanguageId(language, languageId),
            stdin: tc.input,
          }
        );

        const output = judgeResponse.data.stdout?.trim() || "";
        const passed = output === tc.expectedOutput.trim();

        results.push({
          input: tc.input,
          expected: tc.expectedOutput,
          got: output,
          status: passed ? "passed" : "failed",
        });

        if (!passed) allPassed = false;
      } catch {
        results.push({
          input: tc.input,
          expected: tc.expectedOutput,
          got: null,
          status: "failed",
        });
        allPassed = false;
      }
    }

    // ---------- Step 3: Update submission ----------
    try {
      await submissionModel.findByIdAndUpdate(
        new mongoose.Types.ObjectId(submissionId),
        {
          status: allPassed ? "accepted" : "failed",
          results,
        },
        { new: true }
      );
      console.log(
        `✅ Submission ${submissionId} → ${allPassed ? "ACCEPTED" : "FAILED"}`
      );
    } catch (err) {
      console.error("❌ Failed to update submission:", err.message);
    }
  },
  { connection }
);

// ================= Worker Events =================
codeWorker.on("completed", (job) => {
  console.log(`🎉 Job ${job.id} completed`);
});

codeWorker.on("failed", (job, err) => {
  console.error(`💥 Job ${job?.id} failed:`, err.message);
});
