import { Router } from "express";
import { products } from "../../data/mongo/manager.mongo.js";

const productsRouter = Router();

productsRouter.get("/form", async (req, res, next) => {
  try {
    return res.render("form");
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await products.readOne(pid);
    return res.render("detail", { product: one });
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
