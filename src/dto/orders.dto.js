import argsUtils from "../utils/args.utils.js";
import crypto from "crypto";

class OrderDTO {
  constructor(data) {
    argsUtils.env !== "prod" &&
      (this._id = crypto.randomBytes(12).toString("hex")),
      (this.productId = data.productId),
      (this.userId = data.userId),
      (this.quantity = data.quantity),
      (this.state = data.state || 1),
      argsUtils.env !== "prod" && (this.updatedAt = new Date()),
      argsUtils.env !== "prod" && (this.createdAt = new Date());
  }
}

export default OrderDTO;
