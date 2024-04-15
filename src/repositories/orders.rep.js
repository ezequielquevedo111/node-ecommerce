import dao from "../data/index.factory.js";
import OrderDTO from "../dto/orders.dto.js";

const { orders } = dao;

class OrdersRep {
  constructor() {
    this.model = orders;
  }

  create = async (data) => {
    data = new OrderDTO(data);
    const response = await this.model.create(data);
    return response;
  };

  read = async ({ filter, orderAndPaginate }) => {
    return await this.model.read({ filter, orderAndPaginate });
  };

  readOne = async (id) => {
    return await this.model.readOne(id);
  };

  update = async (id, data) => {
    return await this.model.update(id, data);
  };

  destroy = async (oid) => {
    return await this.model.destroy(oid);
  };
}

const repository = new OrdersRep();

export default repository;
