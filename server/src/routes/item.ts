import express from "express";
import ItemController from "../controllers/item-controller";
import multer from "multer";

const storage = multer.diskStorage({
  destination: "public/img",
  filename(req, file, callback) {
    const imageName = file.originalname.split(".").shift();
    const imageExt = file.originalname.split(".").pop();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    callback(null, `${imageName}-${uniqueSuffix}.${imageExt}`);
  },
});

const upload = multer({ storage });
const item = express.Router();

item.get("/", ItemController.getAll);

item.post("/", upload.single("image"), ItemController.store);

item.get("/:id", ItemController.getOne);

item.put("/:id", upload.single("image"), ItemController.update);

item.delete("/:id", ItemController.destroy);

export default item;
