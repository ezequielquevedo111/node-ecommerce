import CustomError from "./errors/CustomError.js";
import errors from "./errors/errors.js";

const has8charUtils = (password) => {
  console.log(password);
  if (password.length < 8) {
    // const error = new Error("The password must be at least 8 characters long");
    // error.statusCode = 400;
    CustomError.new(errors.passwordLength);
    throw error;
  }
};

export default has8charUtils;
