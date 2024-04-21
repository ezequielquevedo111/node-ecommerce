import dao from "../data/index.factory.js";
import UserDTO from "../dto/users.dto.js";

const { users } = dao;

class UsersRep {
  constructor() {
    this.model = users;
  }

  create = async (data) => {
    data = new UserDTO(data);
    const response = await this.model.create(data);
    return response;
  };

  read = async ({ filter, orderBy }) => {
    const response = await this.model.read({ filter, orderBy });
    return response;
  };

  readOne = async (id) => {
    const response = await this.model.readOne(id);
    return response;
  };

  readByEmail = async (email) => {
    return await this.model.readByEmail(email);
  };

  update = async (id, data) => {
    const response = await this.model.update(id, data);
    return response;
  };

  destroy = async (id) => {
    const response = await this.model.destroy(id);
    return response;
  };
}

const repository = new UsersRep();
export default repository;
