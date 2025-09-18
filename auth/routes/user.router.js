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
      return res.status(400).json({ error: "Token not found in request body" });
    }

    let cookieToken = token;
    let expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    // Try Firebase ID token first
    try {
      cookieToken = await admin
        .auth()
        .createSessionCookie(token, { expiresIn });
    } catch (err) {
      console.warn("⚠️ Not a Firebase token, assuming app JWT:", err.message);
      cookieToken = token; // fallback: set app JWT directly
      expiresIn = 7 * 24 * 60 * 60 * 1000; // 1 week for app JWT
    }

    // Set cookie
    res.cookie("token", cookieToken, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: false, // true in prod
      sameSite: "strict",
    });

    res.json({ message: "Cookie set successfully" });
  } catch (error) {
    console.error("❌ Error while setting cookie:", error);
    res.status(401).json({ error: "Unauthorized", details: error.message });
  }
});

export default router;
