import logger from "../utils/logger/indexLogger.js";

function winston(req, res, next) {
  try {
    req.logger = logger;
    const message = `${req.method} ${req.url} - ${new Date()} `;
    req.logger.HTTP(message);
    return next();
  } catch (error) {
    return next(error);
  }
}

export default winston;
