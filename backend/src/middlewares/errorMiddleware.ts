// errorMiddleware.ts
import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({
    data: [],
    status: false,
    statusCode: 404,
    message: "Resource not found",
  });
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack); // Log the error stack for debugging

  res.status(500).json({
    data: [],
    status: false,
    statusCode: 500,
    message: "Internal Server Error",
  });
};
