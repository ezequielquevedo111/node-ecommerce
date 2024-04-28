// import products from "../data/mongo/products.mongo.js";
// import dao from "../data/index.factory.js";
// const { products } = dao;
import repository from "../repositories/products.rep.js";

class ProductsService {
  constructor() {
    this.repository = repository;
  }

  create = async (dataProduct) => {
    try {
      const response = await this.repository.create(dataProduct);
      return response;
    } catch (error) {
      throw error;
    }
  };
  read = async ({ filter, orderAndPaginate }) => {
    try {
      const response = await this.repository.read({ filter, orderAndPaginate });
      return response;
    } catch (error) {
      throw error;
    }
  };

  readOne = async (pid) => {
    try {
      const response = await this.repository.readOne(pid);
      return response;
    } catch (error) {
      throw error;
    }
  };

  update = async (pid, data) => {
    try {
      const response = await this.repository.update(pid, data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  destroy = async (pid) => {
    try {
      const response = await this.repository.destroy(pid);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const service = new ProductsService();
export default service;
