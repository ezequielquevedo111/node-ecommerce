// import { Router } from "express";
import has8char from "../../middlewares/has8char.js";
import passport from "./../../middlewares/passport.js";
import passCallBack from "../../middlewares/passCallBack.js";
import CustomRouter from "../CustomRouter.js";

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
      // passport.authenticate("register", opts),
      async (req, res, next) => {
        try {
          // return res.json({
          //   statusCode: 201,
          //   message: "Registered",
          // });
          return res.success201({ message: "Registered" });
        } catch (error) {
          return next(error);
        }
      }
    );

    //login
    this.create(
      "/login",
      ["PUBLIC"],
      // passport.authenticate("login", opts),
      passCallBack("login"),
      async (req, res, next) => {
        try {
          return res
            .cookie("token", req.token, {
              maxAge: 7 * 24 * 60 * 60,
              httpOnly: true,
            })
            .success200({ message: "Logged in" });
          // .json({
          //   statusCode: 200,
          //   message: "Logged in",
          // });
        } catch (error) {
          return next(error);
        }
      }
    );

    //signout

    this.update(
      "/signout",
      ["USER", "ADMIN", "PREM"],
      // passport.authenticate("jwt", {
      //   session: false,
      //   failureRedirect: "/api/sessions/signout/cb",
      // }),
      passCallBack("jwt"),
      async (req, res, next) => {
        try {
          return res
            .clearCookie("token")
            .success200({ message: "Signed out!" });
          // .json({
          //   statusCode: 200,
          //   message: "Signed out!",
          // });
        } catch (error) {
          return next(error);
        }
      }
    );

    this.read("/badauth", ["USER", "ADMIN", "PREM"], (req, res, next) => {
      try {
        return res.error401();
        // .json({
        //   statusCode: 401,
        //   message: "Bad auth",
        // });
      } catch (error) {
        return next(error);
      }
    });

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
      async (req, res, next) => {
        try {
          return res
            .cookie("token", req.token, {
              maxAge: 7 * 24 * 60 * 60,
              httpOnly: true,
            })
            .success200({
              message: "Logged in with Google!",
              session: req.session,
            });
          // .json({
          //   statusCode: 200,
          //   message: "Logged in with Google!",
          //   session: req.session,
          // });
          //EN ESTE CASO HABRÍA QUE VER COMO APLICAR PARA PASAR LA SESSION
        } catch (error) {
          return next(error);
        }
      }
    );

    //me

    this.read("/", ["PUBLIC"], passCallBack("jwt"), async (req, res, next) => {
      try {
        // const user = {
        //   email: req.user.email,
        //   role: req.user.role,
        //   photo: req.user.photo,
        // };
        // return res.json({
        //   statusCode: 200,
        //   response: user,
        // });
        return res.success200({ response: { role: req.user.role } });
      } catch (error) {
        return next(error);
      }
    });

    this.read("/signout/cb", ["USER", "ADMIN", "PREM"], (req, res, next) => {
      try {
        return res.error400({ message: "Already done" });
        // .json({
        //   statusCode: 400,
        //   message: "Already done",
        // });
      } catch (error) {
        return next(error);
      }
    });
  }
}

