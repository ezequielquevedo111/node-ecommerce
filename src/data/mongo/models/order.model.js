import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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

schema.pre("find", function () {
  this.populate("userId", "-password -createdAt -updatedAt -__v");
});
schema.pre("find", function () {
  this.populate("productId", "-createdAt -updatedAt -__v");
});

schema.plugin(mongoosePaginate);
const Order = model(collection, schema);

export default Order;
