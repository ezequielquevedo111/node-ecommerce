// import { Router } from "express";
import { products } from "../../data/mongo/manager.mongo.js";
import CustomRouter from "../CustomRouter.js";

// const productsRouter = Router();

export default class ProductsRouter extends CustomRouter {
  init() {
    this.read("/form", ["ADMIN", "PREM"], async (req, res, next) => {
      try {
        return res.render("form");
      } catch (error) {
        next(error);
      }
    });

    this.read("/:pid", ["PUBLIC"], async (req, res, next) => {
      try {
        const { pid } = req.params;
        const one = await products.readOne(pid);
        return res.render("detail", { product: one });
      } catch (error) {
        next(error);
      }
    });
  }
}

// export default productsRouter;
