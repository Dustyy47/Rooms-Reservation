import jwt from "jsonwebtoken";
import AdminModel from "../models/AdminModel.js";

class AuthChecker {
  tryAuth = (req, res, next) => {
    try {
      const token = (req.headers.authorization || "").split(" ")[1];
      if (!token) {
        res.status(401).json("Необходимо авторизироваться!");
        next();
        return;
      }
      const payload = jwt.verify(token, process.env.SECRET);
      req.userId = payload.userId;
      next();
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message });
    }
  };

  checkAdmin = async (req, res, next) => {
    this.tryAuth(req, res, next);
    const currentUser = await AdminModel.findById(req.userId);
    if (!currentUser) {
      return res.status(401).json({ message: "Ошибка авторизации" });
    }
    next();
  };
}

export default new AuthChecker();
