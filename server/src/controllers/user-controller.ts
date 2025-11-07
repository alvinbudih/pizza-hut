import { NextFunction, Request, Response } from "express";
import cleanNullishValue from "../helpers/clean-nullish-value";
import User from "../services/user";
import CustomRequest from "../helpers/custom-request";

export default class UserController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    console.log("list user api...");

    try {
      const users = await User.findAll();

      res.json({ status: 200, users });
    } catch (error) {
      next(error);
    }
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    console.log("create user api...");

    try {
      const {
        body: { name, email, password, role },
      } = req;

      const payload = cleanNullishValue({
        name,
        email,
        password,
        role,
      });

      const user = await User.create(payload);

      res.status(201).json({
        status: 201,
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req: Request, res: Response, next: NextFunction) {
    console.log("get user api...");

    try {
      const {
        params: { id },
      } = req;

      const user = await User.findById(id);

      res.json({ status: 200, user });
    } catch (error) {
      next(error);
    }
  }

  static async edit(req: Request, res: Response, next: NextFunction) {
    console.log("update user api...");

    try {
      const {
        params: { id },
        body: { name, email, password, role },
      } = req;

      const payload = cleanNullishValue({ name, email, role });

      const user = await User.update(id, { ...payload, password });

      res.json({ status: 200, user });
    } catch (error) {
      next(error);
    }
  }

  static async destroy(req: Request, res: Response, next: NextFunction) {
    console.log("delete user api...");

    try {
      const {
        params: { id },
      } = req;

      const user = await User.destroy(id);

      res.json({ status: 200, user });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    console.log("login api...");

    try {
      const {
        body: { email, password },
      } = req;

      const payload = cleanNullishValue({ email, password });

      const result = await User.login(payload);

      res.json({ status: 200, result });
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req: Request, res: Response, next: NextFunction) {
    console.log("get profile api...");

    try {
      const {
        user: { id },
      } = req as CustomRequest;

      const user = await User.findById(id);

      res.json({ status: 200, user });
    } catch (error) {
      next(error);
    }
  }
}
