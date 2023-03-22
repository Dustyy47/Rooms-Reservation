import { Router } from "express";
import roomsController from "../../controllers/roomsController.js";

export const ordersRouter = new Router();

ordersRouter.post("/:id", roomsController.orderRoom);
