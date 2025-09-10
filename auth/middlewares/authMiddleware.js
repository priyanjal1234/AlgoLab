import jwt from "jsonwebtoken";

const authMiddleware = function (req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    const data = jwt.verify(token, process.env.JWT_KEY);
    req.user = data;
    next();
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : `Error validating the token: ${error}`,
    });
  }
};

export default authMiddleware
