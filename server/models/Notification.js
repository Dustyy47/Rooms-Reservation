import mongoose from "mongoose";
const { Schema, model } = mongoose;

const NotificationType = [
  "orderUnrecognized",
  "orderAccepted",
  "orderDeclined",
];

const NotificationSchema = new Schema(
  {
    targetUser: { type: Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: NotificationType },
    title: { type: String },
  },
  {
    timestamps: true,
  }
);

export default model("Notification", NotificationSchema);
