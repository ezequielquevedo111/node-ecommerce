import { Router } from "express";
import products from "../../data/fs/product.Fs.Manager.js";

const productsRouter = Router();

// Endpoints - Products //

//CREATE PRODUCT WITH POST//
productsRouter.post("/", async (req, res) => {
  try {
    const dataProduct = req.body;
    const response = await products.create(dataProduct);
    if (
      response === "The values of title, photo, price and stock are required."
    ) {
      return res.json({
        statusCode: 400,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 201,
        response,
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

//GET ALL PRODUCTS//
productsRouter.get("/", async (req, res) => {
  try {
    const allProducts = await products.read();
    if (allProducts.length === 0) {
      return res.json({
        statusCode: 404,
        message: "There are no products available",
      });
    } else {
      return res.json({
        statusCode: 200,
        response: allProducts,
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

//GET ONE PRODUCT BY ID//
productsRouter.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const oneProduct = await products.readOne(pid);
    if (oneProduct.length === 0) {
      return res.json({
        statusCode: 404,
        message: oneProduct,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: oneProduct,
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 505,
      message: error.message,
    });
  }
});

//UPDATE A PRODUCT BY ID//
productsRouter.put("/:pid", async (req, res) => {
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
        message: oneProduct,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: oneProduct,
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 505,
      message: error.message,
    });
  }
});

//DELETE PRODUCT BY ID//
productsRouter.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const oneProduct = await products.destroy(pid);
    if (oneProduct === "There isn't a product with ID:") {
      return res.json({
        statusCode: 404,
        message: oneProduct,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: oneProduct,
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 505,
      message: error.message,
    });
  }
});

export default productsRouter;
