import CustomRouter from "../CustomRouter.js";
import { products } from "../../data/mongo/manager.mongo.js";
import propsProducts from "../../middlewares/propsProducts.js";
import isAdmin from "../../middlewares/isAdmin.js";
import passport from "../../middlewares/passport.js";
import passCallBack from "../../middlewares/passCallBack.js";

export default class ProductsRouter extends CustomRouter {
  init() {
    //CREATE PRODUCT WITH POST//
    this.create(
      "/",
      // passport.authenticate("jwt", { session: false }),
      passCallBack("jwt"),
      ["ADMIN", "PREM"],
      isAdmin,
      propsProducts,
      async (req, res, next) => {
        try {
          const dataProduct = req.body;
          const response = await products.create(dataProduct);
          // return res.json({
          //   statusCode: 201,
          //   response,
          // });
          return res.success201(response);
        } catch (error) {
          return next(error);
        }
      }
    );

    //GET ALL PRODUCTS//
    this.read("/", ["PUBLIC"], async (req, res, next) => {
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

        // return res.json({
        //   statusCode: 200,
        //   response: allProducts,
        // });
        return res.success200(allProducts);
      } catch (error) {
        return next(error);
      }
    });

    //GET ONE PRODUCT BY ID//
    this.read("/:pid", ["PUBLIC"], async (req, res, next) => {
      try {
        const { pid } = req.params;
        const oneProduct = await products.readOne(pid);
        // return res.json({
        //   statusCode: 200,
        //   response: oneProduct,
        // });
        return res.success200(oneProduct);
      } catch (error) {
        return next(error);
      }
    });

    //UPDATE A PRODUCT BY ID//
    this.update("/:pid", ["ADMIN", "PREM"], async (req, res, next) => {
      try {
        const { pid } = req.params;
        const data = req.body;
        const oneProduct = await products.update(pid, data);
        // return res.json({
        //   statusCode: 200,
        //   response: oneProduct,
        // });
        return res.success200(oneProduct);
      } catch (error) {
        return next(error);
      }
    });

    //DELETE PRODUCT BY ID//
    this.destroy("/:pid", ["ADMIN", "PREM"], async (req, res, next) => {
      try {
        const { pid } = req.params;
        const oneProduct = await products.destroy(pid);
        // return res.json({
        //   statusCode: 200,
        //   response: oneProduct,
        // });
        return res.success200(oneProduct);
      } catch (error) {
        return next(error);
      }
    });
  }
}

