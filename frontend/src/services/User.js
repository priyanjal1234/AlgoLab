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
      console.log("🚀 Starting Google sign-in...");

      // Step 1: Sign in with popup
      let result = await signInWithPopup(auth, googleProvider);
      console.log("✅ Google sign-in successful:", result.user?.email);

      // Step 2: Get Firebase ID token (must await)
      const token = await result.user.getIdToken();
      console.log(
        "🔑 Firebase ID token generated:",
        token ? token.substring(0, 20) + "..." : "No token"
      );

      // Step 3: Send token to backend
      console.log("📡 Sending token to backend:", `${this.baseUrl}/set-cookie`);
      const res = await fetch(`${this.baseUrl}/set-cookie`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // so cookie is stored
        body: JSON.stringify({ token }),
      });

      // Step 4: Read backend response
      const data = await res.json();
      console.log("📩 Backend response:", data);

      // Step 5: Handle success/failure
      if (!res.ok) {
        throw new Error(`❌ Failed to set cookie: ${data.error || res.status}`);
      }

      console.log("🎉 Cookie set successfully, user signed in.");
      return result.user;
    } catch (error) {
      console.error("🔥 Google sign-in failed:", error);
      throw error;
    }
  }
}

let userService = new UserService();

export default userService;
