import api from "./api.js";

class UserService {
  constructor() {
    this.api = api;
    this.baseUrl = "http://localhost:3000/api/auth";
  }

  async createAccount(data) {
    try {
      return await this.api.post(`${this.baseUrl}/register`, data, {
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }
}

let userService = new UserService()

export default userService