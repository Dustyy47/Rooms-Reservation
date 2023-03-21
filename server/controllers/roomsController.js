import OrderModel, { ORDER_STATUS } from "../models/OrderModel.js";
import RoomModel from "../models/RoomModel.js";

class RoomsController {
  async getAllRooms(req, res) {
    try {
      const rooms = await RoomModel.find();
      res.json(rooms);
    } catch (e) {
      handleError(res, e);
    }
    // const rooms = RoomModel;
  }
  getOrderedRooms() {}
  getRoom() {}

  async orderRoom(req, res) {
    try {
      const { userId } = req.userId;
      const { roomId: id } = req.params;
      const { start, end } = req.body;
      const room = await RoomModel.findById(id);
      if (!room) {
        res.status(404).json({ message: "Такого помещения нет" });
        return;
      }
      let orders = await OrderModel.find({ room: id, status: "accepted" });

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
        room: id,
        start,
        end,
        orderBy: userId,
      });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте позже..." });
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
      console.log(e);
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте позже..." });
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
