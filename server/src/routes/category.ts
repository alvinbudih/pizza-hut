import express from "express";
import CategoryController from "../controllers/category-controller";
const category = express.Router();

category.get("/", CategoryController.getAll);

category.post("/", CategoryController.store);

category.get("/:id", CategoryController.getOne);

category.put("/:id", CategoryController.edit);

category.delete("/:id", CategoryController.destroy);

export default category;
