// import orders from "../data/mongo/orders.mongo.js";
// import dao from "../data/index.factory.js";
import repository from "../repositories/orders.rep.js";
import isStockAvailable from "../utils/isStockAvailable.js";

class OrdersService {
  constructor() {
    this.repository = repository;
  }

  create = async (dataBody) => {
    try {
      let dataOrder = await isStockAvailable(dataBody);
      const response = await this.repository.create(dataOrder);
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

  readOne = async (uid) => {
    try {
      const response = await this.repository.readOne(uid);
      return response;
    } catch (error) {
      throw error;
    }
  };

  update = async (id, data) => {
    try {
      const response = await this.repository.update(id, data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // update = async (oid, propUpdate, req) => {
  //   try {
  //     const response = await this.model.updateOrder(oid, propUpdate, req);
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  destroy = async (oid) => {
    try {
      const response = await this.repository.destroy(oid);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // report = async (uid) => {
  //   try {
  //     const response = await this.model.report(uid);
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // };
}

const service = new OrdersService();
export default service;

