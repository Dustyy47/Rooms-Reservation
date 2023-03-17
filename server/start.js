import cors from "cors";
import { config } from "dotenv";
import express, { json } from "express";
import fileUpload from "express-fileupload";
import http from "http";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { router } from "./routes/routes.js";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

config();

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(json());
app.use(express.static(path.resolve(__dirname, "images")));
app.use(fileUpload({}));
app.use("/api", router);

const startApp = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    server.listen(PORT, () => console.log("Started at port " + PORT));
  } catch (e) {
    console.log(e);
  }
};

startApp();
