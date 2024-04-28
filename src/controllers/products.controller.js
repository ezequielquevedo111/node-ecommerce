// import { products } from "../data/mongo/manager.mongo.js";
import service from "../services/products.service.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";

class ProductsController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const dataProduct = req.body;
      const response = await this.service.create(dataProduct);
      return res.success201({ response });
    } catch (error) {
      return next(error);
    }
  };

  read = async (req, res, next) => {
    try {
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

      let allProducts = await this.service.read({ filter, orderAndPaginate });
      if (allProducts.docs.length > 0) {
        return res.success200(allProducts);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const oneProduct = await this.service.readOne(pid);
      if (oneProduct) {
        return res.success200(oneProduct);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const data = req.body;
      const oneProduct = await this.service.update(pid, data);
      if (oneProduct) {
        return res.success200(oneProduct);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      let { pid } = req.params;
      const oneProduct = await this.service.destroy(pid);
      if (oneProduct) {
        return res.success200(oneProduct);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };
}

export default ProductsController;
const productController = new ProductsController();
const { create, read, readOne, update, destroy } = productController;
export { create, read, readOne, update, destroy };
