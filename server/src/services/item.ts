import path from "path";
import prisma from "../config/prisma";
import validate from "../helpers/validate";
import {
  ItemPayload,
  itemSchema,
  UpdateItemPayload,
  updateItemSchema,
} from "../schemas/item-schema";
import { unlink } from "fs/promises";
import { Prisma } from "@prisma/client";

export default class Item {
  static async findAll() {
    return await prisma.item.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        price: true,
        Category: {
          select: {
            name: true,
          },
        },
        Author: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  static async create(payload: ItemPayload) {
    const data = validate(itemSchema, payload);

    return await prisma.item.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        AuthorId: data.AuthorId,
        CategoryId: data.CategoryId,
        Ingredients: {
          create: data.Ingredients.map(({ name }) => ({ name })),
        },
      },
    });
  }

  static async findById(id: string) {
    return await prisma.item.findUniqueOrThrow({
      where: { id },
      include: {
        Author: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        Category: {
          select: {
            id: true,
            name: true,
          },
        },
        Ingredients: {
          select: {
            id: true,
            ItemId: true,
            name: true,
          },
        },
      },
    });
  }

  static async update(id: string, payload: UpdateItemPayload) {
    const item = await prisma.item.findUniqueOrThrow({ where: { id } });

    const data = validate(updateItemSchema, payload);

    return prisma.$transaction(async (tx) => {
      const result = await tx.item.update({
        where: { id },
        data: {
          name: data.name,
          description: data.description,
          price: data.price,
          image: data.image,
          CategoryId: data.CategoryId,
        },
      });

      const keepStoredIds = data.Ingredients.filter(
        (ingredient) => !!ingredient.id
      ).map(({ id }) => id) as Array<string>;

      await tx.ingredient.deleteMany({
        where: {
          id: {
            notIn: keepStoredIds,
          },
          ItemId: result.id,
        },
      });

      for (const ingredient of data.Ingredients) {
        await tx.ingredient.upsert({
          where: {
            id: ingredient.id ?? "",
          },
          create: {
            name: ingredient.name,
            ItemId: result.id,
          },
          update: {
            name: ingredient.name,
            ItemId: result.id,
          },
        });
      }

      await unlink(path.join(__dirname, "../../public/img/") + item.image);

      return result;
    });
  }

  static async destroy(id: string) {
    const item = await prisma.item.findUniqueOrThrow({ where: { id } });

    await unlink(path.join(__dirname, "../../public/img/") + item.image);

    return await prisma.item.delete({ where: { id } });
  }
}
