import passport from "passport";
import winston from "../utils/logger/winston.utils.js";

export default (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      winston.ERROR({ error, user, info });
      if (error) {
        return next(error);
      }
      if (!user) {
        winston.INFO(info);
        return res.json({
          statusCode: info.statusCode || 401,
          message: info.messages || info.toString(),
        });
      }
      req.user = user;
      return next();
    })(req, res, next);
  };
};
