import dotenv from 'dotenv'
dotenv.config()

import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

const services = {
  auth: "http://localhost:3001",
};

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: services.auth,
    changeOrigin: true,
    pathRewrite: { "^/api/auth": "" },
  })
);


const port = process.env.PORT || 4000
app.listen(port,function() {
    console.log(`Gateway is running on port ${port}`)
})