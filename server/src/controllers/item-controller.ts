import { NextFunction, Request, Response } from "express";
import Item from "../services/item";
import cleanNullishValue from "../helpers/clean-nullish-value";
import CustomRequest from "../helpers/custom-request";

export default class ItemController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    console.log("list item api...");

    try {
      const items = await Item.findAll();

      res.json({ status: 200, items });
    } catch (error) {
      next(error);
    }
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    console.log("create item api...");

    try {
      const {
        file,
        body: { name, description, price, CategoryId, Ingredients },
        user: { id: AuthorId },
      } = req as CustomRequest;

      const payload = cleanNullishValue({
        name,
        description,
        price,
        AuthorId,
        CategoryId,
        image: file?.filename as string,
        Ingredients,
      });

      const item = await Item.create(payload);

      res.status(201).json({ status: 201, item });
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req: Request, res: Response, next: NextFunction) {
    console.log("get item api...");

    try {
      const {
        params: { id },
      } = req;

      const item = await Item.findById(id);

      res.json({ status: 200, item });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    console.log("edit item api");

    try {
      const {
        file,
        body: { name, description, price, CategoryId, Ingredients },
        params: { id },
        user: { id: AuthorId },
      } = req as CustomRequest;

      const payload = cleanNullishValue({
        name,
        description,
        price,
        image: file?.filename as string,
        AuthorId,
        CategoryId,
        Ingredients,
      });

      const item = await Item.update(id, payload);

      res.json({ status: 200, item });
    } catch (error) {
      next(error);
    }
  }

  static async destroy(req: Request, res: Response, next: NextFunction) {
    console.log("delete item api...");

    try {
      const {
        params: { id },
      } = req;

      const item = await Item.destroy(id);

      res.json({ status: 200, item });
    } catch (error) {
      next(error);
    }
  }
}
