import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

let collection = "products";

const schema = new Schema(
  {
    title: { type: String, required: true, index: true },
    photo: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 1 },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);
const Product = model(collection, schema);

export default Product;
