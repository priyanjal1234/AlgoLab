import jwt from "jsonwebtoken";
import admin from "../config/firebaseAdmin.js"; // jahan aapka admin SDK init hai

const authMiddleware = async function (req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    let userData = null;
    let errors = {};

    // 🔹 1. Try verifying as Firebase session cookie
    try {
      userData = await admin.auth().verifySessionCookie(token, true);
      
      req.user = userData;
      return next();
    } catch (err) {
      errors.firebaseErr = err.message;
    }

    // 🔹 2. Try verifying as our own JWT
    try {
      userData = jwt.verify(token, process.env.JWT_KEY);
      req.user = userData;
      return next();
    } catch (err) {
      errors.jwtErr = err.message;
    }

    // 🔹 If neither worked, send error
    return res.status(401).json({
      message: "Invalid token (neither Firebase session cookie nor App JWT)",
      errors,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : `Error validating the token: ${error}`,
    });
  }
};

export default authMiddleware;
