import OrderModel, { ORDER_STATUS } from "../models/OrderModel.js";
import RoomModel from "../models/RoomModel.js";
import { handleError } from "../utils/handleError.js";

// TODO ПРОДУМАТЬ СЛУЧАЙ, КОГДА ДВА ЧЕЛОВЕКА СДЕЛАЛИ ЗАКАЗ НА ОДНО И ТО ЖЕ ВРЕМЯ И ПРИ ЭТОМ НИ ОДИН ИЗ ИХ ЗАКАЗОВ ЕЩЁ НЕ БЫЛ ПРИНЯТ!!!
// TODO ДОБАВИТЬ НЕДОСТУПНЫЕ ДАТЫ (ПРАЗДНИКИ И Т.П)

class RoomsController {
  async getAllRooms(req, res) {
    try {
      const rooms = await RoomModel.find();
      console.log('@ROOMS',rooms)
      res.json(rooms);
    } catch (e) {
      handleError(res, e);
    }
    // const rooms = RoomModel;
  }
  async getOrderedRooms(req, res) {
    try {
      const userId = req.userId;
      const orders = await OrderModel.find({ orderBy: userId }).populate(
        "room"
      );
      res.json(orders);
    } catch (e) {
      handleError(res, e);
    }
  }

  async getRoom(req, res) {
    try {
      const { id } = req.params;
      const room = await RoomModel.findById(id);
      const orders = await OrderModel.find({
        room: id,
        status: ORDER_STATUS.SUBMITED,
      });
      res.json({
        room,
        orders,
      });
    } catch (e) {
      handleError(res, e);
    }
  }

  async orderRoom(req, res) {
    try {
      const { userId } = req.userId;
      const { roomId } = req.params;
      const { start, end } = req.body;
      const room = await RoomModel.findById(roomId);
      if (!room) {
        res.status(404).json({ message: "Такого помещения нет" });
        return;
      }
      let orders = await OrderModel.find({ room: roomId, status: "accepted" });

      // Проверка, есть ли заказы на время, пересекающееся с данным
      for (let order in orders) {
        if (
          (start >= order.start && start <= order.end) ||
          (end >= order.start && end <= order.end) ||
          (start <= order.start && end >= order.end)
        ) {
          return res
            .status(400)
            .json({ message: "Помещение уже забронировано на это время" });
        }
      }

      const order = await OrderModel.create({
        room: roomId,
        start,
        end,
        orderBy: userId,
      });
      res.json(order);
    } catch (e) {
      handleError(res, e);
    }
  }

  async addRoom(req, res) {
    try {
      const { title, description, adress } = req.body;
      if (!title || !description || !adress) {
        res.status(500).json("Недостаточно данных для создания комнаты");
        return;
      }
      const candidate = await RoomModel.findOne({ title });
      if (candidate)
        return res
          .status(400)
          .json({ message: "Такая комната уже существует" });
      const newRoom = await RoomModel.create({ title, description, adress });
      res.json(newRoom);
    } catch (e) {
      handleError(res, e);
    }
  }

  async getOrders(req, res) {
    try {
      const orders = await OrderModel.find({
        status: ORDER_STATUS.UNRECOGNIZED,
      });
      return res.json(orders);
    } catch (e) {
      handleError(res, e);
    }
  }

  async submitOrder(req, res) {
    try {
      const { id } = req.params;
      const order = await OrderModel.findById(id);
      order.status = ORDER_STATUS.SUBMITED;
      await order.save();
      return res.json(orders);
    } catch (e) {
      handleError(res, e);
    }
  }

  async rejectOrder(req, res) {
    try {
      const { id } = req.params;
      const order = await OrderModel.findById(id);
      order.status = ORDER_STATUS.REJECTED;
      await order.save();
      return res.json(orders);
    } catch (e) {
      handleError(res, e);
    }
  }
}

export default new RoomsController();
