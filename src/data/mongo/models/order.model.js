import { model, Schema, Types } from "mongoose";

import mongoosePaginate from "mongoose-paginate-v2";
import CustomError from "../../../utils/errors/CustomError.js";
import errors from "../../../utils/errors/errors.js";

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
  this.populate("userId", "-password");
});
schema.pre("find", function () {
  this.populate("productId", "price photo stock title createdAt updatedAt __v");
});

schema.pre("save", async function (next) {
  try {
    // Buscar el producto asociado a esta orden y poblar los campos correspondientes
    const product = await this.model("products").findById(this.productId);
    if (!product) {
      // throw new Error("Product not found");
      CustomError.new(errors.notFound);
    }
    this.price = product.price;
    this.stock = product.stock;
    this.title = product.title;
    next();
  } catch (error) {
    next(error);
  }
});

schema.plugin(mongoosePaginate);

const Order = model(collection, schema);

export default Order;
