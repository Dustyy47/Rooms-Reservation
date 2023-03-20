import bcrypt from "bcrypt";
import AdminModel from "../models/AdminModel.js";
import { StudentModel, TeacherModel } from "../models/UserModel.js";
import { createToken } from "../utils/createToken.js";

class AuthController {
  async register(req, res) {
    try {
      const { email, password, fullname, phone, speciality, type } = req.body;
      let Model;
      if (type === "teacher") {
        Model = TeacherModel;
      } else if (type === "student") {
        Model = StudentModel;
      } else
        return res.status(500).json({ message: "Неверный тип пользователя" });

      const candidate = await Model.findOne({ email });
      if (candidate)
        return res.status(400).json({ message: "Такой email занят" });
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await Model.create({
        email,
        password: passwordHash,
        fullname,
        phone,
        speciality,
        role: "base",
      });
      const token = createToken(user._id);
      res.json(token);
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте позже..." });
    }
  }

  async login(req, res) {
    try {
      const { email, password, type } = req.body;
      let Model;
      if (type === "teacher") {
        Model = TeacherModel;
      } else if (type === "student") {
        Model = StudentModel;
      } else
        return res.status(500).json({ message: "Неверный тип пользователя" });

      const user = await Model.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Неверный логин или пароль" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(404).json({ message: "Неверный логин или пароль" });
      }
      const token = createToken(user.nickName, user._id);
      res.json(token);
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте позже..." });
    }
  }

  //   Зарегистрировать администратора может лишь другой администратор, если администраторов в системе нет, его стоит добавить через бд,
  //  однако, стоит учитывать, что пароли хранятся в захэшированном формате.
  async registerAdmin(req, res) {
    try {
      const { email, fullname, password } = req.body;
      if (!email || !fullname || !password) {
        res.status(500).json("Недостаточно данных для регистрации");
        return;
      }
      const userId = req.userId;
      console.log(userId);
      const currentUser = await AdminModel.findById(userId);
      if (!currentUser) {
        return res.status(401).json({ message: "Ошибка авторизации" });
      }
      const candidate = await AdminModel.findOne({ email });
      if (candidate)
        return res.status(400).json({ message: "Такой email занят" });
      const passwordHash = await bcrypt.hash(password, 10);
      const newAdmin = AdminModel.create({
        email,
        fullname,
        password: passwordHash,
      });
      res.json({
        email: email,
        fullname: fullname,
      });
    } catch (e) {
      console.log("@", e);
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте позже..." });
    }
  }

  async loginAdmin(req, res) {
    try {
      const { email, password } = req.body;
      const admin = await AdminModel.findOne({ email });
      if (!admin) {
        return res.status(404).json({ message: "Неверный логин или пароль" });
      }
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(404).json({ message: "Неверный логин или пароль" });
      }
      const token = createToken(admin._id);
      res.json(token);
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте позже..." });
    }
  }
}

export default new AuthController();
