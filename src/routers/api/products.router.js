import { Router } from "express";
// import products from "../../data/fs/product.Fs.Manager.js";
import { products } from "../../data/mongo/manager.mongo.js";
import propsProducts from "../../middlewares/propsProducts.js";
import isAdmin from "../../middlewares/isAdmin.js";
import isQueryFilter from "../../utils/isQueryFilter.js";
const productsRouter = Router();

// Endpoints - Products //

//CREATE PRODUCT WITH POST//

productsRouter.post("/", propsProducts, isAdmin, async (req, res, next) => {

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

    // Filtrado dinámico dependiendo de la propiedad
    const orderAndPaginate = {
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      sort: { price: 1 },
    };

    const filter = {};

    if (req.query.title) {
      filter.title = new RegExp(req.query.title.trim(), "i");
    }
    if (req.query.price === "desc") {
      orderAndPaginate.sort.price = -1;
    }

    let allProducts = await products.read({ filter, orderAndPaginate });

    return res.json({
      statusCode: 200,
      response: allProducts,
    });
  } catch (error) {
    return next(error);
  }
});

//GET ONE PRODUCT BY ID//
productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const oneProduct = await products.readOne(pid);
    return res.json({
      statusCode: 200,
      response: oneProduct,
    });
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
    return res.json({
      statusCode: 200,
      response: oneProduct,
    });
  } catch (error) {
    return next(error);
  }
});

//DELETE PRODUCT BY ID//
productsRouter.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const oneProduct = await products.destroy(pid);
    return res.json({
      statusCode: 200,
      response: oneProduct,
    });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
