import bcrypt from "bcrypt";
import AdminModel from "../models/AdminModel.js";
import { StudentModel, TeacherModel, UserModel } from "../models/UserModel.js";
import { createToken } from "../utils/createToken.js";
import { handleError } from "../utils/handleError.js";

class AuthController {
  async getMe(req, res) {
    try {
      const userId = req.userId;
      const candidate = await UserModel.findById(userId);
      if (!candidate) {
        return res.status(401).json({ message: "Ошибка авторизации" });
      }
      const { password, ...rest } = candidate._doc;
      return res.json({
        ...rest,
      });
    } catch (e) {
      handleError(res, e);
    }
  }

  async registerStudent(req, res) {
    try {
      const { email, password, fullname, phone, course } = req.body;
      const candidate = await StudentModel.findOne({ email });
      if (candidate)
        return res.status(400).json({ message: "Такой email занят" });
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await StudentModel.create({
        email,
        password: passwordHash,
        fullname,
        phone,
        course,
      });
      const token = createToken(user._id, false);
      res.json(token);
    } catch (e) {
      handleError(res, e);
    }
  }

  async registerTeacher(req, res) {
    try {
      const { email, password, fullname, phone, speciality } = req.body;
      const candidate = await TeacherModel.findOne({ email });
      if (candidate)
        return res.status(400).json({ message: "Такой email занят" });
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await TeacherModel.create({
        email,
        password: passwordHash,
        fullname,
        phone,
        speciality,
      });
      const token = createToken(user._id, false);
      res.json(token);
    } catch (e) {
      handleError(res, e);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Неверный логин или пароль" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(404).json({ message: "Неверный логин или пароль" });
      }
      const token = createToken(user._id, false);
      res.json(token);
    } catch (e) {
      handleError(res, e);
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
      const candidate = await AdminModel.findOne({ email });
      if (candidate) {
        res.status(400).json({ message: "Такой email занят" });
        return;
      }
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
      handleError(res, e);
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
      const token = createToken(admin._id, true);
      res.json(token);
    } catch (e) {
      handleError(res, e);
    }
  }
}

export default new AuthController();
