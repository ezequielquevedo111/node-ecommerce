import { orders } from "../data/mongo/manager.mongo.js";
import isStockAvailable from "../utils/isStockAvailable.js";

class OrdersService {
  constructor() {
    this.model = orders;
  }

  create = async (dataBody) => {
    try {
      let dataOrder = await isStockAvailable(dataBody);
      const response = await this.model.create(dataOrder);
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

  update = async (oid, propUpdate, req) => {
    try {
      const response = await this.model.updateOrder(oid, propUpdate, req);
      return response;
    } catch (error) {
      throw error;
    }
  };

  destroy = async (oid) => {
    try {
      const response = await this.model.destroy(oid);
      return response;
    } catch (error) {
      throw error;
    }
  };

  report = async (uid) => {
    try {
      const response = await this.model.report(uid);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const service = new OrdersService();
export default service;
