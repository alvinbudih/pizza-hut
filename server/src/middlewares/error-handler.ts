import { NextFunction, Request, Response } from "express";
import CustomError from "../helpers/errors/custom-error";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";
import cleanNullishValue from "../helpers/clean-nullish-value";
import { PrismaClientKnownRequestError } from "../generated/prisma/internal/prismaNamespace";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let message,
    status,
    fieldErrors: Record<string, any> = {};

  console.log(err);

  switch (true) {
    case err instanceof ZodError:
      message = "Bad Request";
      status = 400;
      console.log(err.format());

      const formattedErr = cleanNullishValue(err.format()) as Record<
        string,
        any
      >;

      for (const key in formattedErr) {
        for (const k in formattedErr[key]) {
          if (!isNaN(Number(k))) {
            fieldErrors[key] = {
              ...(fieldErrors[key] && { ...fieldErrors[key] }),
            };
            for (const field in formattedErr[key][k]) {
              fieldErrors[key][k] = {
                ...(fieldErrors[key][k] && { ...fieldErrors[key][k] }),
              };
              fieldErrors[key][k][field] = formattedErr[key][k][field]._errors;
            }
          }
        }
        if (formattedErr[key]._errors) {
          fieldErrors[key] = formattedErr[key]._errors;
        }
      }

      break;

    case err instanceof CustomError:
      message = err.message;
      status = err.status;
      break;

    case err instanceof PrismaClientKnownRequestError:
      message = err.message;
      status = 404;
      break;

    case err instanceof JsonWebTokenError:
      message = err.message;
      status = 401;
      break;

    default:
      message = "Internal Server Error";
      status = 500;
      break;
  }

  res
    .status(status)
    .json({ status, message, ...(err instanceof ZodError && { fieldErrors }) });
}
