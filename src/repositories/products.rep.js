import dao from "../data/index.factory.js";
import ProductDTO from "../dto/products.dto.js";

const { products } = dao;

class ProductsRep {
  constructor() {
    this.model = products;
  }

  create = async (data) => {
    data = new ProductDTO(data);
    const response = await this.model.create(data);
    return response;
  };

  read = async ({ filter, orderAndPaginate }) => {
    return await this.model.read({ filter, orderAndPaginate });
  };

  readOne = async (id) => await this.model.readOne(id);

  update = async (pid, data) => {
    return await this.model.update(pid, data);
  };

  destroy = async (pid) => await this.model.destroy(pid);
}

const repository = new ProductsRep();
export default repository;
