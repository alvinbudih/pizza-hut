import "dotenv/config";
import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/error-handler";
import isAuthenticated from "./middlewares/is-authenticated";
import guest from "./routes/guest";
import user from "./routes/user";
import category from "./routes/category";
import item from "./routes/item";
import path from "path";
import profile from "./routes/profile";
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "../public")));

app.use(guest);

app.use(isAuthenticated);
app.use("/profile", profile);
app.use("/users", user);
app.use("/categories", category);
app.use("/items", item);

app.use(errorHandler);

app.listen(port, () => {
  console.clear();
  console.log(`Pizza App is listening on port ${port}`);
});
