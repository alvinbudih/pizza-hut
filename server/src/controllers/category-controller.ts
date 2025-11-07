import { NextFunction, Request, Response } from "express";
import Category from "../services/category";
import cleanNullishValue from "../helpers/clean-nullish-value";

export default class CategoryController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    console.log("list category api...");

    try {
      const categories = await Category.findAll();

      res.json({ status: 200, categories });
    } catch (error) {
      next(error);
    }
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    console.log("create category api...");

    try {
      const {
        body: { name },
      } = req;

      const payload = cleanNullishValue({ name });

      const category = await Category.create(payload);

      res.status(201).json({ status: 201, category });
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req: Request, res: Response, next: NextFunction) {
    console.log("get category api...");

    try {
      const {
        params: { id },
      } = req;

      const category = await Category.findById(id);

      res.json({ status: 200, category });
    } catch (error) {
      next(error);
    }
  }

  static async edit(req: Request, res: Response, next: NextFunction) {
    console.log("update category api...");

    try {
      const {
        params: { id },
        body: { name },
      } = req;

      const payload = cleanNullishValue({ name });

      const category = await Category.update(id, payload);

      res.json({ status: 200, category });
    } catch (error) {
      next(error);
    }
  }

  static async destroy(req: Request, res: Response, next: NextFunction) {
    console.log("delete category api...");

    try {
      const {
        params: { id },
      } = req;

      const category = await Category.destroy(id);

      res.json({ status: 200, category });
    } catch (error) {
      next(error);
    }
  }
}
