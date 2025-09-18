import jwt from "jsonwebtoken";
import admin from "../config/firebaseAdmin.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    let userData = null;
    let errors = {};

    // 1️⃣ Try verifying as Firebase session cookie
    try {
      userData = await admin.auth().verifySessionCookie(token, true);
      req.user = {
        email: userData.email,
        name: userData.name,
        firebase: true,
      };
      return next();
    } catch (err) {
      errors.firebaseErr = err.message;
    }

    // 2️⃣ Try verifying as Firebase ID token directly (if not using session cookie)
    try {
      userData = await admin.auth().verifyIdToken(token);
      req.user = {
        email: userData.email,
        name: userData.name,
        firebase: true,
      };
      return next();
    } catch (err) {
      errors.firebaseErrIdToken = err.message;
    }

    // 3️⃣ Try verifying as app JWT
    try {
      userData = jwt.verify(token, process.env.JWT_KEY, { algorithms: ["HS256"] });
      req.user = { ...userData, firebase: false };
      return next();
    } catch (err) {
      errors.jwtErr = err.message;
    }

    // If none worked
    return res.status(401).json({
      message: "Invalid token (neither Firebase session cookie nor App JWT)",
      errors,
    });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : `Error validating the token: ${error}`,
    });
  }
};

export default authMiddleware;
