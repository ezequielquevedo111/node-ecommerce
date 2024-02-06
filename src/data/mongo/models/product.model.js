import { model, Schema } from "mongoose";

let collection = "products";

const schema = new Schema(
  {
    title: { type: String, required: true },
    photo: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 1 },
  },
  { timestamps: true }
);

const Product = model(collection, schema);

export default Product;
