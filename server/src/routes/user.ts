import express from "express";
import UserController from "../controllers/user-controller";
import adminAuthorized from "../middlewares/admin-authorized";
const user = express.Router();

user.use(adminAuthorized);

user.get("/", UserController.getAll);

user.post("/", UserController.store);

user.get("/:id", UserController.getOne);

user.put("/:id", UserController.edit);

user.delete("/:id", UserController.destroy);

export default user;
