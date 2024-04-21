import winstonUtils from "../utils/logger/winston.utils.js";

const errorHandler = (error, req, res, next) => {
  if (!error.statusCode || error.statusCode === 500) {
    error.statusCode = 500;
    winstonUtils.ERROR(error.message);
  } else {
    winstonUtils.WARN(error.message);
  }
  return res.json({
    statusCode: error.statusCode,
    response: `${req.method} ${req.url} ${error.message}`,
  });
};

export default errorHandler;
