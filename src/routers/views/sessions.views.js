import { Router } from "express";

const sessionsRouter = Router();

sessionsRouter.get("/register", async (req, res, next) => {
  try {
    return res.render("register");
  } catch (error) {
    next(error);
  }
});

sessionsRouter.get("/login", async (req, res, next) => {
  try {
    return res.render("login");
  } catch (error) {
    next(error);
  }
});

export default sessionsRouter;
