import { Router } from "express";
import authController from "../../controllers/authController.js";
import authChecker from "../../utils/authChecker.js";

export const authRouter = new Router();

authRouter.post(
  "/registration",
  authChecker.checkAdmin,
  authController.registerAdmin
);
authRouter.post("/login", authController.loginAdmin);
