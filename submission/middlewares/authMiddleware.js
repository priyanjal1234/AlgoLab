import jwt from "jsonwebtoken";

const authMiddleware = function (req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(404).json({ message: "Token not found" });
    const data = jwt.verify(token, process.env.JWT_KEY);
    req.user = data;
    next();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log(`Error in token validation: ${error}`);
    }
  }
};

export default authMiddleware