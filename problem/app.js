import express from "express";
import cookieParser from "cookie-parser";

import problemRouter from './routes/problem.router.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health",function(req,res) {
    res.send("hello problem")
})

app.use("/",problemRouter)

export default app;
