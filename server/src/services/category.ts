import prisma from "../config/prisma";
import validate from "../helpers/validate";
import { CategoryPayload, categorySchema } from "../schemas/category-schema";

export default class Category {
  static async findAll() {
    return await prisma.category.findMany();
  }

  static async create(payload: CategoryPayload) {
    const data = validate(categorySchema, payload);

    return await prisma.category.create({ data });
  }

  static async findById(id: string) {
    return await prisma.category.findUniqueOrThrow({ where: { id } });
  }

  static async update(id: string, payload: CategoryPayload) {
    await prisma.category.findUniqueOrThrow({ where: { id } });

    const data = validate(categorySchema, payload);

    return await prisma.category.update({ where: { id }, data });
  }

  static async destroy(id: string) {
    await prisma.category.findUniqueOrThrow({ where: { id } });

    return await prisma.category.delete({ where: { id } });
  }
}
