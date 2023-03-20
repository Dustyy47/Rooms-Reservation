import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  phone: { type: String, unique: true },
});

export const UserModel = model("User", UserSchema);

export const StudentModel = UserModel.discriminator("Student", {
  course: { type: String, enum: ["1", "2", "3", "4", "5", "6"] },
});

export const TeacherModel = UserModel.discriminator("Teacher", {
  speciality: { type: String },
});
