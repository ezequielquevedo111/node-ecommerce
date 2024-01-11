import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  try {
    return res.render("index");
  } catch (error) {
    next(error);
  }
});

viewsRouter.get("/real", (req, res, next) => {
  try {
    return res.render("real");
  } catch (error) {
    next(error);
  }
});

viewsRouter.get("/register", (req, res, next) => {
  try {
    return res.render("register");
  } catch (error) {
    next(error);
  }
});

viewsRouter.get("/form", (req, res, next) => {
  try {
    return res.render("form");
  } catch (error) {
    next(error);
  }
});

export default viewsRouter;
