import { Router } from "express";
// import { users } from "../../data/mongo/manager.mongo.js";
import has8char from "../../middlewares/has8char.js";
// import isValidPass from "../../middlewares/isValidPass.js";
import passport from "./../../middlewares/passport.js";
import passCallBack from "../../middlewares/passCallBack.js";

const sessionsRouter = Router();
const opts = { session: false, failureRedirect: "/api/sessions/badauth" };

//register
sessionsRouter.post(
  "/register",
  has8char,
  passCallBack("register"),
  // passport.authenticate("register", opts),
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
  // passport.authenticate("login", opts),
  passCallBack("login"),
  async (req, res, next) => {
    try {
      return res
        .cookie("token", req.token, {
          maxAge: 7 * 24 * 60 * 60,
          httpOnly: true,
        })
        .json({
          statusCode: 200,
          message: "Logged in",
        });
    } catch (error) {
      return next(error);
    }
  }
);

//signout

sessionsRouter.post(
  "/signout",
  // passport.authenticate("jwt", {
  //   session: false,
  //   failureRedirect: "/api/sessions/signout/cb",
  // }),
  passCallBack("jwt"),
  async (req, res, next) => {
    try {
      return res.clearCookie("token").json({
        statusCode: 200,
        message: "Signed out!",
      });
    } catch (error) {
      return next(error);
    }
  }
);

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

//google oauth
sessionsRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

//google-callback
sessionsRouter.get(
  "/google/callback",
  passport.authenticate("google", opts),
  async (req, res, next) => {
    try {
      return res
        .cookie("token", req.token, {
          maxAge: 7 * 24 * 60 * 60,
          httpOnly: true,
        })
        .json({
          statusCode: 200,
          message: "Logged in with Google!",
          session: req.session,
        });
    } catch (error) {
      return next(error);
    }
  }
);

//me

sessionsRouter.post("/", passCallBack("jwt"), async (req, res, next) => {
  try {
    const user = {
      email: req.user.email,
      role: req.user.role,
      photo: req.user.photo,
    };
    return res.json({
      statusCode: 200,
      response: user,
    });
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.get("/signout/cb", (req, res, next) => {
  try {
    return res.json({
      statusCode: 400,
      message: "Already done",
    });
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
