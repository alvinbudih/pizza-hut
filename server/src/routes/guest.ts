import express from "express";
import UserController from "../controllers/user-controller";
const guest = express.Router();

guest.post("/login", UserController.login);

export default guest;
