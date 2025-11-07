import { NextFunction, Request, Response } from "express";
import CustomError from "../helpers/errors/custom-error";
import verifyToken from "../helpers/verify-token";
import CustomRequest, { PayloadToken } from "../helpers/custom-request";
import prisma from "../config/prisma";

export default async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("is authenticated middleware");

  try {
    const {
      headers: { authorization },
    } = req;
    const err = new CustomError("Unauthenticated", 401);

    if (!authorization) {
      throw err;
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
      throw err;
    }

    const payload = verifyToken(token) as PayloadToken;

    const user = await prisma.user.findUnique({ where: { id: payload.id } });

    if (!user) {
      throw err;
    }

    (req as CustomRequest).user = payload;
    next();
  } catch (error) {
    next(error);
  }
}
