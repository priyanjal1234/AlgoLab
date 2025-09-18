import express from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  verifyPhone,
  vonageWebhooksAnswer,
  vonageWebhooksEvents,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import admin from "../config/firebaseAdmin.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/verify-phone").post(verifyPhone);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/profile").get(authMiddleware, getUser);

router.route("/webhooks/answer").get(authMiddleware, vonageWebhooksAnswer);

router.route("/webhooks/events").post(vonageWebhooksEvents);

router.route("/set-cookie").post(async function (req, res) {
  try {
    const { token } = req.body;

    if (!token) {
      console.warn("⚠️ No token provided in request body");
      return res.status(400).json({ error: "Token not found in request body" });
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    // Try to create Firebase session cookie
    const sessionCookie = await admin
      .auth()
      .createSessionCookie(token, { expiresIn });

    // Set cookie in response
    res.cookie("token", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: false, // keep false for localhost, true in production
      sameSite: "strict",
    });

    res.json({ message: "Cookie set successfully" });
  } catch (error) {
    console.error("❌ Error while setting cookie:", error);

    res.status(401).json({
      error: "Unauthorized",
      details: error.message || error,
    });
  }
});

export default router;
