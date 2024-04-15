import argsUtils from "../utils/args.utils.js";
import crypto from "crypto";
import { createHash } from "../utils/hash.utils.js";

class UserDTO {
  constructor(data) {
    argsUtils.env !== "prod" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.name = data.name;
    this.photo =
      data.photo || "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    this.email = data.email;
    this.password = createHash(data.password);
    this.age = data.age || 18;
    this.role = data.role || 0;
    this.verified = data.verified || false;
    this.verifiedCode = crypto.randomBytes(12).toString("base64");
    argsUtils.env !== "prod" && (this.updatedAt = new Date()),
      argsUtils.env !== "prod" && (this.createdAt = new Date());
  }
}

export default UserDTO;
