import express from "express";
import cors from "cors";

import errorHandler from "./middlewares/errorHandler.ts";
import corsOptions from "./config/corsOptions.ts";

import applicationsRoute from "./routes/applications.route.ts";
import sessionsRoute from "./routes/sessions.route.ts";
import answersRoute from "./routes/answers.route.ts";

const app = express();

// App configuration
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  return res.json({
    message: "AI Interview Coach is Healthy...",
  });
});

// Endpoints
app.use("/api/applications", applicationsRoute);
app.use("/api/sessions", sessionsRoute);
app.use("/api/answers", answersRoute);

// Error Handler
app.use(errorHandler);

export default app;
