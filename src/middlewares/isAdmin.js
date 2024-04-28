import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";
import { verifyToken } from "../utils/token.utils.js";

export default (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === 1) {
      return next();
    } else {
      CustomError.new(errors.forbidden);
    }
  } catch (error) {
    return next(error);
  }
};
