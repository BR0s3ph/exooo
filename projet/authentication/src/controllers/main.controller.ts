import { Request, Response, NextFunction } from "express";

export const mainController = {
  NotFound(req: Request, res: Response, next: NextFunction) {
    res.status(404).json({
      error: "Not Found",
      message: "The requested resource could not be found.",
    });
  },
  InternalServerError(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err); // Log the error for debugging
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred. Please try again later.",
    });
  },
  error(req: Request, res: Response) {
    throw new Error("An error occurred in the main controller");
  },
};