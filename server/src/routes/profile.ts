import express from "express";
import UserController from "../controllers/user-controller";

const profile = express.Router();

profile.get("/", UserController.getProfile);

export default profile;
