import dotenv from "dotenv";
dotenv.config();

import express from "express";
import proxy from "express-http-proxy";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", proxy("http://localhost:3001"));

app.use("/api/problems", proxy("http://localhost:3002"));

app.use("/api/submissions", proxy("http://localhost:3003"));

const port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log(`Gateway is running on port ${port}`);
});
