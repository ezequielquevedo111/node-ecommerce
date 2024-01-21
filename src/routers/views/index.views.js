import { Router } from "express";
import registerRouter from "./register.views.js";
import products from "../../data/fs/product.Fs.Manager.js";
import formRouter from "./form.views.js";
import realRouter from "./real.views.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const allProducts = await products.read();
    return res.render("index", { products: allProducts });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/register", registerRouter);
viewsRouter.use("/form", formRouter);
viewsRouter.use("/real", realRouter);

export default viewsRouter;
