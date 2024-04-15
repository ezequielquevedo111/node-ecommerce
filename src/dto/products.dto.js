import argsUtils from "../utils/args.utils.js";
import crypto from "crypto";

class ProductDTO {
  constructor(data) {
    argsUtils.env !== "prod" &&
      (this._id = crypto.randomBytes(12).toString("hex")),
      (this.title = data.title),
      (this.photo = data.photo),
      (this.price = parseInt(data.price) || 1000),
      (this.stock = parseInt(data.stock) || 10),
      (this.date = data.date || new Date()),
      argsUtils.env !== "prod" && (this.updatedAt = new Date()),
      argsUtils.env !== "prod" && (this.createdAt = new Date());
  }
}

export default ProductDTO;
