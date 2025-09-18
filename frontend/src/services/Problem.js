import api from "./api";

class ProblemService {
  constructor() {
    this.api = api;
    this.baseUrl = "http://localhost:3000/api/problems";
  }

  async getAllProblems() {
    try {
      return await this.api.get(`${this.baseUrl}/all-problems`, {
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }
}

let problemService = new ProblemService();

export default problemService;
