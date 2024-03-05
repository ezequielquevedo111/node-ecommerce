import CustomRouter from "../CustomRouter.js";

export default class SessionsRouter extends CustomRouter {
  init() {
    this.read("/register", ["PUBLIC"], async (req, res, next) => {
      try {
        return res.render("register");
      } catch (error) {
        next(error);
      }
    });

    this.read("/login", ["PUBLIC"], async (req, res, next) => {
      try {
        return res.render("login");
      } catch (error) {
        next(error);
      }
    });
  }
}
