import { Router } from "express";
import roomsController from "../../controllers/roomsController.js";

export const roomsRouter = new Router();

roomsRouter.post("/create", roomsController.addRoom);
roomsRouter.post("/order/:id", roomsController.orderRoom);
