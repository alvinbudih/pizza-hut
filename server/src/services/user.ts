import { compareSync, hashSync } from "bcryptjs";
import prisma from "../config/prisma";
import CustomError from "../helpers/errors/custom-error";
import validate from "../helpers/validate";
import {
  LoginPayload,
  loginSchema,
  UserEditPayload,
  userEditSchema,
  UserPayload,
  userSchema,
} from "../schemas/user-schema";
import signToken from "../helpers/sign-token";

export default class User {
  static async findAll() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  static async create(payload: UserPayload) {
    const data = validate(userSchema, payload);

    const isRegistered = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (isRegistered) {
      throw new CustomError("Email is registered", 400);
    }

    data.password = hashSync(data.password);

    const result = await prisma.user.create({ data });

    return result;
  }

  static async findById(id: string) {
    return await prisma.user.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  static async update(id: string, payload: UserEditPayload) {
    await prisma.user.findUniqueOrThrow({ where: { id } });

    const data = validate(userEditSchema, payload);

    if (data.password) {
      data.password = hashSync(data.password);
    }

    return await prisma.user.update({ where: { id }, data });
  }

  static async destroy(id: string) {
    await prisma.user.findUniqueOrThrow({ where: { id } });

    return await prisma.user.delete({ where: { id } });
  }

  static async login(payload: LoginPayload) {
    const data = validate(loginSchema, payload);

    const user = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user || !compareSync(data.password, user.password)) {
      throw new CustomError("Invalid email or password", 400);
    }

    return {
      accessToken: signToken({
        id: user.id,
        name: user.name,
        email: user.email,
      }),
    };
  }
}
