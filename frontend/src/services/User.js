import { auth, googleProvider } from "../firebase/index.js";
import api from "./api.js";
import { signInWithPopup, signOut } from "firebase/auth";

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

  async loginAccount(data) {
    try {
      return await this.api.post(`${this.baseUrl}/login`, data, {
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await this.api.get(`${this.baseUrl}/logout`, {
        withCredentials: true,
      });
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  }

  async getUser() {
    try {
      return await this.api.get(`${this.baseUrl}/profile`, {
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async signInWithGoogle() {
    try {
      

      // Step 1: Sign in with popup
      let result = await signInWithPopup(auth, googleProvider);

      // Step 2: Get Firebase ID token (must await)
      const token = await result.user.getIdToken();
      

      // Step 3: Send token to backend
      const res = await fetch(`${this.baseUrl}/set-cookie`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // so cookie is stored
        body: JSON.stringify({ token }),
      });

      // Step 4: Read backend response
      const data = await res.json();

      // Step 5: Handle success/failure
      if (!res.ok) {
        throw new Error(`❌ Failed to set cookie: ${data.error || res.status}`);
      }
      return result.user;
    } catch (error) {
      console.error("🔥 Google sign-in failed:", error);
      throw error;
    }
  }
}

let userService = new UserService();

export default userService;
