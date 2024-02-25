import { Router } from "express";
import { users } from "../../data/mongo/manager.mongo.js";
import has8char from "../../middlewares/has8char.js";
import isValidPass from "../../middlewares/isValidPass.js";
import passport from "./../../middlewares/passport.js";

const sessionsRouter = Router();
const opts = { session: false, failureRedirect: "/api/sessions/badauth" };

//register
sessionsRouter.post(
  "/register",
  has8char,
  passport.authenticate("register", opts),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 201,
        message: "Registered",
      });
    } catch (error) {
      return next(error);
    }
  }
);

//login
sessionsRouter.post(
  "/login",
  passport.authenticate("login", opts),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Logged in",
        session: req.session,
      });
    } catch (error) {
      return next(error);
    }
  }
);

//signout

sessionsRouter.post("/signout", async (req, res, next) => {
  try {
    if (req.session.email) {
      req.session.destroy();
      return res.json({
        statusCode: 200,
        message: "Signed out!",
      });
    } else {
      const error = new Error("No Auth");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.get("/badauth", (req, res, next) => {
  try {
    return res.json({
      statusCode: 401,
      message: "Bad auth",
    });
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
