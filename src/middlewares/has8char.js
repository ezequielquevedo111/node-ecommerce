import has8charUtils from "../utils/has8char.utils.js";

const has8char = async (req, res, next) => {
  try {
    const { password } = req.body;
    has8charUtils(password);
    return next();
  } catch (error) {
    return next(error);
  }
};

export default has8char;
