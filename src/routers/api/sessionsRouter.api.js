// import { Router } from "express";
import has8char from "../../middlewares/has8char.js";
import passport from "./../../middlewares/passport.js";
import passCallBack from "../../middlewares/passCallBack.js";
import CustomRouter from "../CustomRouter.js";
import {
  register,
  login,
  signout,
  badauth,
  google,
  me,
} from "../../controllers/sessions.controller.js";

// const sessionsRouter = Router();
const opts = { session: false, failureRedirect: "/api/sessions/badauth" };

export default class SessionsRouter extends CustomRouter {
  init() {
    //register
    this.create(
      "/register",
      ["PUBLIC"],
      has8char,
      passCallBack("register"),
      register
    );

    //login
    this.create("/login", ["PUBLIC"], passCallBack("login"), login);

    //signout

    this.update(
      "/signout",
      ["USER", "ADMIN", "PREM"],
      passCallBack("jwt"),
      signout
    );

    this.read("/badauth", ["USER", "ADMIN", "PREM"], badauth);

    //google oauth
    this.read(
      "/google",
      ["USER", "ADMIN", "PREM"],
      passport.authenticate("google", { scope: ["email", "profile"] })
    );

    //google-callback
    this.read(
      "/google/callback",
      ["USER", "ADMIN", "PREM"],
      passport.authenticate("google", opts),
      google
    );

    //me

    this.read("/", ["PUBLIC"], passCallBack("jwt"), me);

    this.read("/signout/cb", ["USER", "ADMIN", "PREM"], (req, res, next) => {
      try {
        return res.error400({ message: "Already done" });
      } catch (error) {
        return next(error);
      }
    });
  }
}
