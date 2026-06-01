import type { NextFunction, Request, Response } from "express";
import { env } from "../../env.ts";

const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction,) => {
  try {
    let status = 500;
    let message = "Internal Server Error";
    let stack = "";

    if (err instanceof Error) {
      message = err.message;
      stack = err.stack || "";
    }

    console.log(err);

    return res.status(status).json({
      error: message,
      ...(env.NODE_ENV === "development" && {
        stack,
      }),
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: "Internal Server Error",
      ...(env.NODE_ENV === "development" && {
        stack: e instanceof Error ? e.stack : "",
      }),
    });
  }
};

export default errorHandler;
