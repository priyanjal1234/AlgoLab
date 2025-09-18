import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Play, Check, X, Clock, Tag, BookOpen, Loader2 } from "lucide-react";
import ProblemsNavbar from "../components/ProblemsNavbar";
import problemService from "../services/Problem";
import Editor from "@monaco-editor/react";
import { toast } from "react-toastify";
import submissionService from "../services/Submission";

function ProblemDetails() {
  const { slug } = useParams();

  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(""); // ✅ fixed
  const [testCases, setTestCases] = useState([]); // ✅ fixed
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  // Fetch problem details
  async function getProblemDetails() {
    try {
      const problemRes = await problemService.getOneProblem(slug);
      setProblem(problemRes.data);

      // Initialize code + test cases
      if (problemRes.data?.starterCode?.[selectedLanguage]) {
        setCode(problemRes.data.starterCode[selectedLanguage]);
      }
      if (Array.isArray(problemRes.data?.testCases)) {
        setTestCases(problemRes.data.testCases);
      }
    } catch (error) {
      console.log(error?.response?.data?.message || "Error fetching problem");
    }
  }

  useEffect(() => {
    getProblemDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // Update code when language or problem changes
  useEffect(() => {
    if (problem?.starterCode?.[selectedLanguage]) {
      setCode(problem.starterCode[selectedLanguage]);
    }
  }, [selectedLanguage, problem]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400";
      case "Medium":
        return "text-yellow-400";
      case "Hard":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getTestCaseIcon = (status) => {
    switch (status) {
      case "processing":
        return <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />;
      case "passed":
        return <Check className="w-4 h-4 text-green-400" />;
      case "failed":
        return <X className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTestCaseCardColor = (status) => {
    switch (status) {
      case "processing":
        return "border-blue-500 bg-blue-500/10";
      case "passed":
        return "border-green-500 bg-green-500/10";
      case "failed":
        return "border-red-500 bg-red-500/10";
      default:
        return "border-gray-700 bg-gray-800";
    }
  };

  const languageMap = (lang) => {
    const ids = {
      javascript: 63,
      python: 71,
    };
    return ids[lang];
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (!code.trim()) {
      setIsSubmitting(false);
      toast.error("Please write some code");
      return;
    }
    let langid = languageMap(selectedLanguage);
    try {
      let submitCodeRes = await submissionService.submitCode(
        problem?._id,
        code,
        selectedLanguage,
        langid
      );
      let { submissionId } = submitCodeRes.data;
      let interval = setInterval(async () => {
        const statusRes = await submissionService.getSubmission(submissionId);
        const submission = statusRes.data;

        if (submission.status !== "pending") {
          clearInterval(interval);
          setIsSubmitting(false);

          if (submission.status === "accepted") {
            toast.success("Accepted ✅");
          } else {
            toast.error("Failed ❌");
          }
        }
      }, 2000); // poll every 2s
    } catch (error) {
      setIsSubmitting(false);
      toast.error(error?.response?.data?.message);
    }
  };

  if (!problem) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        Loading problem...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <ProblemsNavbar />

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Side - Problem Description */}
        <div className="w-1/2 border-r border-gray-800 overflow-y-auto">
          <div className="p-6">
            {/* Problem Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-2xl font-bold">
                  {problem._id?.slice(-4)}. {problem.title}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                    problem.difficulty
                  )}`}
                >
                  {problem.difficulty}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Description
              </h2>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {problem.description}
              </div>
            </div>

            {/* Examples */}
            {Array.isArray(problem.examples) && problem.examples.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Examples</h2>
                <div className="space-y-4">
                  {problem.examples.map((example, index) => (
                    <div
                      key={index}
                      className="bg-gray-900 p-4 rounded-lg border border-gray-800"
                    >
                      <div className="font-semibold mb-2">
                        Example {index + 1}:
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">Input: </span>
                          <code className="bg-gray-800 px-2 py-1 rounded">
                            {example.input}
                          </code>
                        </div>
                        <div>
                          <span className="text-gray-400">Output: </span>
                          <code className="bg-gray-800 px-2 py-1 rounded">
                            {example.output}
                          </code>
                        </div>
                        {example.explanation && (
                          <div>
                            <span className="text-gray-400">Explanation: </span>
                            <span className="text-gray-300">
                              {example.explanation}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Constraints */}
            {Array.isArray(problem.constraints) &&
              problem.constraints.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-3">Constraints</h2>
                  <ul className="space-y-1 text-gray-300">
                    {problem.constraints.map((constraint, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        <code className="text-sm">{constraint}</code>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Tags */}
            {Array.isArray(problem.tags) && problem.tags.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-3 flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {problem.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Code Editor */}
        <div className="w-1/2 flex flex-col">
          {/* Language Selector */}
          <div className="border-b border-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {["javascript", "python"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-4 py-3 rounded-lg text-sm font-semibold transition-colors duration-200
                      ${
                        selectedLanguage === lang
                          ? "bg-gray-700 text-white border border-green-400 shadow"
                          : "bg-gray-900 text-gray-300 border border-gray-700 hover:bg-gray-800"
                      }`}
                    style={{ textTransform: "capitalize" }}
                    disabled={isSubmitting}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold px-6 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Running...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Submit</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 p-4">
            <Editor
              height="60vh"
              theme="vs-dark"
              language={selectedLanguage}
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>

          {/* Test Cases */}
          {Array.isArray(testCases) && testCases.length > 0 && (
            <div className="border-t border-gray-800 p-4 max-h-80 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Test Cases</h3>
                {submissionResult && (
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      submissionResult.status === "success"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {submissionResult.message}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {testCases.map((testCase, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border transition-all duration-300 ${getTestCaseCardColor(
                      testCase.status
                    )}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Test {index + 1}
                      </span>
                      {getTestCaseIcon(testCase.status)}
                    </div>

                    <div className="text-xs text-gray-400 space-y-1">
                      <div className="truncate">
                        <span className="text-gray-500">Input: </span>
                        {testCase.input}
                      </div>
                      <div className="truncate">
                        <span className="text-gray-500">Expected: </span>
                        {testCase.expectedOutput}
                      </div>
                      {testCase.actualOutput &&
                        testCase.status !== "processing" && (
                          <div className="truncate">
                            <span className="text-gray-500">Actual: </span>
                            <span
                              className={
                                testCase.status === "passed"
                                  ? "text-green-400"
                                  : "text-red-400"
                              }
                            >
                              {testCase.actualOutput}
                            </span>
                          </div>
                        )}
                      {testCase.executionTime && (
                        <div className="text-gray-500">
                          {testCase.executionTime}ms
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProblemDetails;
