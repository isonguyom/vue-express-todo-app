import express from "express";
import path from "path";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors"
import homepageRouter from "./homepageRouter.js";
import todos from "./todos.js";
import assetsRouter from "./assetsRouter.js";

const port = process.env.PORT || 3000;
const publicPath = path.join("public");
const distPath = path.join("dist");

const app = express();
const upload = multer();

app.use(cors())

app.get("/api/v1/hello", (_req, res) => {
  res.json({ message: "Hello, world!" });
});

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(distPath));
} else {
  app.use("/", express.static(publicPath));
  app.use("/src", assetsRouter);
}

// for parsing application/json
app.use(bodyParser.json());

// for parsing multipart/form-data
app.use(upload.array());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/todos", todos);
app.use(homepageRouter);

app.listen(port, () => {
  console.log("Server listening on port", port);
});
