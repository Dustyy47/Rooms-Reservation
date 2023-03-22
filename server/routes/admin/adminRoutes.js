import { Router } from "express";
import authChecker from "../../utils/authChecker.js";
import { authRouter } from "./authRouter.js";
import { ordersRouter } from "./ordersRouter.js";
import { roomsRouter } from "./roomsRouter.js";

export const adminRouter = new Router();

adminRouter.use("/auth", authRouter);
adminRouter.use("/rooms", authChecker.checkAdmin, roomsRouter);
adminRouter.use("/orders", authChecker.checkAdmin, ordersRouter);
