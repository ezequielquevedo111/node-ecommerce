import { Router } from "express";
import products from "../../data/fs/product.Fs.Manager.js";
import propsProducts from "../../middlewares/propsProducts.js";
const productsRouter = Router();

// Endpoints - Products //

//CREATE PRODUCT WITH POST//
productsRouter.post("/", propsProducts, async (req, res, next) => {
  try {
    const dataProduct = req.body;
    const response = await products.create(dataProduct);
    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

//GET ALL PRODUCTS//
productsRouter.get("/", async (req, res, next) => {
  try {
    const allProducts = await products.read();
    if (allProducts.length === 0) {
      return res.json({
        statusCode: 404,
        response: "There are no products available",
      });
    } else {
      return res.json({
        statusCode: 200,
        response: allProducts,
      });
    }
  } catch (error) {
    return next(error);
  }
});

//GET ONE PRODUCT BY ID//
productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const oneProduct = await products.readOne(pid);
    if (oneProduct.length === 0) {
      return res.json({
        statusCode: 404,
        response: oneProduct,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: oneProduct,
      });
    }
  } catch (error) {
    return next(error);
  }
});

//UPDATE A PRODUCT BY ID//
productsRouter.put("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const oneProduct = await products.update(pid, data);
    if (
      oneProduct ===
      `There isn't a product with ID: ${pid}, or there isn't a property named as title, photo, price, or stock. Also, ensure that the values entered for price or stock are of numeric type`
    ) {
      return res.json({
        statusCode: 404,
        response: oneProduct,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: oneProduct,
      });
    }
  } catch (error) {
    return next(error);
  }
});

//DELETE PRODUCT BY ID//
productsRouter.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const oneProduct = await products.destroy(pid);
    if (oneProduct === "There isn't a product with ID:") {
      return res.json({
        statusCode: 404,
        response: oneProduct,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: oneProduct,
      });
    }
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
