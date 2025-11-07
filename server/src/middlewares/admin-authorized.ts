import { NextFunction, Request, Response } from "express";
import CustomRequest from "../helpers/custom-request";
import prisma from "../config/prisma";
import CustomError from "../helpers/errors/custom-error";

export default async function adminAuthorized(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("admin authorized middleware...");

  try {
    const { user: auth } = req as CustomRequest;

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: auth.id },
    });

    if (user.role !== "Admin") {
      throw new CustomError("Forbidden", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
}
