import api from "./api";

class SubmissionService {
  constructor() {
    this.api = api;
    this.baseUrl = "http://localhost:3000/api/submissions";
  }

  async submitCode(problemId, code, language, languageId) {
    try {
      return await this.api.post(
        `${this.baseUrl}/create/${problemId}`,
        { code, language, languageId },
        { withCredentials: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async getSubmission(submissionId) {
    try {
      return await this.api.get(`${this.baseUrl}/submission/${submissionId}`, {
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }
}

let submissionService = new SubmissionService();

export default submissionService;
