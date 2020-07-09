import { ErrorRequestHandler, RequestHandler } from "express";
import HttpStatus from "http-status-codes";

export const notFoundErrorHandler: RequestHandler = (req, res) => {
  res.status(HttpStatus.NOT_FOUND).json({
    success: false,
    error: {
      code: HttpStatus.NOT_FOUND,
      message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
    },
  });
};

export const errorHandler: ErrorRequestHandler = (err, req, res) => {
  res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: {
      code: err.code || HttpStatus.INTERNAL_SERVER_ERROR,
      message:
        err.message ||
        HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
    },
  });
};
