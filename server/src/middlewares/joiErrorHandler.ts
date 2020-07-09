import { ErrorRequestHandler } from "express";
import { ValidationError } from "joi";
import * as HttpStatus from "http-status-codes";

function isJoiError(err: any | ValidationError): err is ValidationError {
  return Boolean(err.isJoi);
}

export const joiErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (isJoiError(err)) {
    const error = {
      code: HttpStatus.BAD_REQUEST,
      message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
      details: err.details?.map(err => ({
        message: err.message,
        param: err.path,
      })),
    };

    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }

  return next(err);
};
