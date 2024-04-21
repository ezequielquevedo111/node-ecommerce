// import { users } from "../data/mongo/manager.mongo.js";
import service from "../services/users.service.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";

class UsersController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const dataUser = req.body;
      const response = await this.service.create(dataUser);
      return res.success201(response);
    } catch (error) {
      return next(error);
    }
  };
  read = async (req, res, next) => {
    try {
      //FILTRADO DINAMICO DEPENDIENDO LA PROPIEDAD//
      let orderBy = req.query.orderBy;
      let filter = req.query.filter;
      const allUsers = await this.service.read({ filter, orderBy });
      if (allUsers.docs.length > 0) {
        return res.success200(allUsers);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const oneUser = await this.service.readOne(uid);
      if (oneUser) {
        return res.success200(oneUser);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };

  readByEmail = async (req, res, next) => {
    try {
      const { email } = req.params;
      const oneUser = await this.service.readByEmail(email);
      if (oneUser) {
        return res.success200(oneUser);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const data = req.body;
      const oneUser = await this.service.update(uid, data);
      if (oneUser) {
        return res.success200(oneUser);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const oneUser = await this.service.destroy(uid);
      if (oneUser) {
        return res.success200(oneUser);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };
}

export default UsersController;
const userController = new UsersController();
const { create, read, readOne, readByEmail, update, destroy } = userController;
export { create, read, readOne, readByEmail, update, destroy };
