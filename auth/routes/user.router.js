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

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/verify-phone").post(verifyPhone)

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/profile").get(authMiddleware, getUser);

router.route("/webhooks/answer").get(authMiddleware,vonageWebhooksAnswer)

router.route("/webhooks/events").post(vonageWebhooksEvents)

export default router;
