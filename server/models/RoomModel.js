import mongoose from "mongoose";
const { Schema, model } = mongoose;
const RoomSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  adress: { type: String },
});

export default model("Room", RoomSchema);
