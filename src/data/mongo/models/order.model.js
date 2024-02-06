import { model, Schema, Types } from "mongoose";

let collection = "orders";

const schema = new Schema(
  {
    productId: { type: Types.ObjectId, required: true, ref: "products" },
    userId: { type: Types.ObjectId, required: true, ref: "users" },
    quantity: { type: Number, required: true },
    state: { type: Number, default: 1, enum: [1, 2, 3] },
  },
  { timestamps: true }
);

const Order = model(collection, schema);

export default Order;
