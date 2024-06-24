import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/error";

export const error = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return response.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 500,
    message: `Internal server error - ${err.message}`,
  });
};
