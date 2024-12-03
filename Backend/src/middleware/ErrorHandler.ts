import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

import { NotFoundException } from "../exception";

export const handleError: ErrorRequestHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof NotFoundException) {
    res.status(404).json({
      statusCode: 404,
      error: "NOT_FOUND",
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
    return;
  }
  
  res.status(500).json({
    statusCode: 500,
    error: "INTERNAL_SERVER_ERROR",
    message: "Ha ocurrido un error. Intente nuevamente.",
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
};
