import { Router } from "express";
import products from "../../data/fs/product.Fs.Manager.js";

const realRouter = Router();

realRouter.use("/", async (req, res, next) => {
  try {
    const allProducts = await products.read();
    return res.render("real", { products: allProducts });
  } catch (error) {
    next(error);
  }
});

export default realRouter;
