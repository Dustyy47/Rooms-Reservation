import bcrypt from "bcrypt";
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

  async loginTeacher(req, res) {
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
        console.log("есть такой");
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
}

export default new AuthController();
