import { products } from "../data/mongo/manager.mongo.js";

class ProductsService {
  constructor() {
    this.model = products;
  }

  create = async (dataProduct) => {
    try {
      const response = await this.model.create(dataProduct);
      return response;
    } catch (error) {
      throw error;
    }
  };
  read = async ({ filter, orderAndPaginate }) => {
    try {
      const response = await this.model.read({ filter, orderAndPaginate });
      return response;
    } catch (error) {
      throw error;
    }
  };

  readOne = async (pid) => {
    try {
      const response = await this.model.readOne(pid);
      return response;
    } catch (error) {
      throw error;
    }
  };

  update = async (pid, data) => {
    try {
      const response = await this.model.update(pid, data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  destroy = async (pid) => {
    try {
      const response = await this.model.destroy(pid);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const service = new ProductsService();
export default service;
