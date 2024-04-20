import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";
import { verifyToken } from "../utils/token.utils.js";

export default (req, res, next) => {
  try {
    // console.log(req.user);
    const { role } = req.user;
    if (role === 1) {
      return next();
    } else {
      // const error = new Error("Forbidden");

      // error.statusCode = 403;
      // throw error;
      CustomError.new(errors.forbidden);
    }
  } catch (error) {
    return next(error);
  }
};
