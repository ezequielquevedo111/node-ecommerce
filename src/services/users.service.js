// import users from "../data/mongo/users.mongo.js";
// import dao from "../data/index.factory.js";
import sendEmail from "../utils/sendEmail.utils.js";
import repository from "../repositories/users.rep.js";
// const { users } = dao;

class UsersService {
  constructor() {
    this.repository = repository;
  }

  create = async (dataUser) => {
    try {
      const response = await this.repository.create(dataUser);
      return response;
    } catch (error) {
      throw error;
    }
  };

  read = async ({ filter, orderBy }) => {
    try {
      const response = await this.repository.read({ filter, orderBy });
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

  readByEmail = async (email) => {
    try {
      const response = await this.repository.readByEmail(email);
      return response;
    } catch (error) {
      throw error;
    }
  };

  update = async (uid, data) => {
    try {
      const response = await this.repository.update(uid, data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  destroy = async (uid) => {
    try {
      const response = await this.repository.destroy(uid);
      return response;
    } catch (error) {
      throw error;
    }
  };

  register = async (data) => {
    try {
      await sendEmail(data);
    } catch (error) {
      throw error;
    }
  };
}

const service = new UsersService();
export default service;
