// import { products } from "../data/mongo/manager.mongo.js";
import service from "../services/products.service.js";

class ProductsController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const dataProduct = req.body;
      const response = await this.service.create(dataProduct);
      console.log(response);
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
      return res.success200(allProducts);
    } catch (error) {
      return next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const oneProduct = await this.service.readOne(pid);
      return res.success200(oneProduct);
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const data = req.body;
      const oneProduct = await this.service.update(pid, data);
      return res.success200(oneProduct);
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const oneProduct = await this.service.destroy(pid);
      return res.success200(oneProduct);
    } catch (error) {
      return next(error);
    }
  };
}

export default ProductsController;
const productController = new ProductsController();
const { create, read, readOne, update, destroy } = productController;
export { create, read, readOne, update, destroy };
