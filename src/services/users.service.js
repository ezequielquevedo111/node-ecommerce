import { users } from "../data/mongo/manager.mongo.js";

class UsersService {
  constructor() {
    this.model = users;
  }

  create = async (dataUser) => {
    try {
      const response = await this.model.create(dataUser);
      return response;
    } catch (error) {
      throw error;
    }
  };

  read = async ({ filter, orderBy }) => {
    try {
      const response = await this.model.read({ filter, orderBy });
      return response;
    } catch (error) {
      throw error;
    }
  };

  readOne = async (uid) => {
    try {
      const response = await this.model.readOne(uid);
      return response;
    } catch (error) {
      throw error;
    }
  };

  readByEmail = async (email, oid) => {
    try {
      const response = await this.model.readByEmail(email, oid);
      return response;
    } catch (error) {
      throw error;
    }
  };

  update = async (uid, data) => {
    try {
      const response = await this.model.update(uid, data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  destroy = async (uid) => {
    try {
      const response = await this.model.destroy();
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const service = new UsersService();
export default service;
