import mongoose from "mongoose";
const { Schema, model } = mongoose;

export const ORDER_STATUS = {
  UNRECOGNIZED: "unrecognized",
  REJECTED: "rejected",
  SUBMITED: "submited",
};

const OrderSchema = new Schema({
  room: { type: Schema.Types.ObjectId, ref: "Room" },
  start: { type: Date },
  end: { type: Date },
  orderBy: { type: Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: [...Object.values(ORDER_STATUS)],
    default: ORDER_STATUS.UNRECOGNIZED,
  },
});

export default model("Order", OrderSchema);
