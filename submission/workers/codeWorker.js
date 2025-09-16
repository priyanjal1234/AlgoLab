import { Worker } from "bullmq";
import axios from "axios";
import IORedis from "ioredis";
import submissionModel from "../models/submission.model.js";

const connection = new IORedis();
const JUDGE0_URL = "https://algolab.skillify-lms.xyz";

const PROBLEM_SERVICE = "http://localhost:3002";

const codeWorker = new Worker(
  "submission",
  async (job) => {
    console.log(`⚡ Processing submission ${job.data.submissionId}`);

    const { submissionId, code, language, languageId, problemId } = job.data;

    let testCases = [];
    try {
      const response = await axios.get(
        `${PROBLEM_SERVICE}/problems/${problemId}`
      );
      testCases = response.data.testCases || [];
    } catch (err) {
      console.error("❌ Failed to fetch problem test cases:", err.message);
      await submissionModel.findByIdAndUpdate(submissionId, {
        status: "error",
      });
      return;
    }

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
      } catch (err) {
        console.error("❌ Judge0 execution error:", err.message);
        results.push({
          input: tc.input,
          expected: tc.expectedOutput,
          got: null,
          status: "failed",
        });
        allPassed = false;
      }
    }

    await submissionModel.findByIdAndUpdate(submissionId, {
      status: allPassed ? "accepted" : "failed",
      results,
    });

    console.log(
      `✅ Submission ${submissionId} evaluated → ${
        allPassed ? "ACCEPTED" : "FAILED"
      }`
    );
  },
  { connection }
);

codeWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err.message);
});
