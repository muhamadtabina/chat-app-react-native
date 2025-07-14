import { ErrorRequestHandler, RequestHandler } from "express";
import mongoose from "mongoose";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //Validation Error
  if (err instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(err.errors).map((e: any) => e.message);
    res.status(422).json({
      errors: messages,
      stack: err.stack,
    });
  }

  // Default 500 error server
  res.status(500).json({
    error: err.message || "Internal server error",
    stack: err.stack,
  });
};

export const NotFound: RequestHandler = (req, res) => {
  res.status(404).json({ message: "Route tidak ditemukan" });
};
