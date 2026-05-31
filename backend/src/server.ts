import express from "express";
import { env } from "../env.ts";

const app = express();

// App configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  return res.json({
    message: "AI Interview Coach is Healthy...",
  });
});

export default app;
