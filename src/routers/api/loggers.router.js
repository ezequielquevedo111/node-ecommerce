import logger from "../../utils/logger/indexLogger.js";
import CustomRouter from "../CustomRouter.js";

export default class LoggersRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], (req, res, next) => {
      logger.HTTP("Message of HTTP"),
        logger.INFO("Message of INFO"),
        logger.WARN("Message of WARN"),
        logger.ERROR("Message of ERROR");

      res.success200("Loggers!");
    });
  }
}
