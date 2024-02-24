import isValidPassUtil from "../utils/isValidPass.util.js";
import { users } from "../data/mongo/manager.mongo.js";

const isValidPass = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await users.readByEmail(email);
    const dbPassword = user.password;
    isValidPassUtil(password, dbPassword);
    return next();
  } catch (error) {
    return next(error);
  }
};

export default isValidPass;
