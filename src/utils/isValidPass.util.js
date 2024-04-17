import CustomError from "./errors/CustomError";
import errors from "./errors/errors";

const isValidPassUtil = (formPassword, dbPassword) => {
  if (formPassword !== dbPassword) {
    // const error = new Error("Invalid credentials, please try again");
    // error.statusCode = 401;
    CustomError.new(errors.invalidCreditials);
    throw error;
  }
};

export default isValidPassUtil;
