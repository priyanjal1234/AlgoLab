import express from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  verifyPhone,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/verify-phone").post(verifyPhone)

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/profile").get(authMiddleware, getUser);

export default router;
