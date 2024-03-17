// import { users } from "../data/mongo/manager.mongo.js";
import service from "../services/users.service.js";

class UsersController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const dataUser = req.body;
      const response = await this.model.service(dataUser);
      return res.success201(response);
    } catch (error) {
      return next(error);
    }
  };
  read = async (req, res, next) => {
    try {
      //FILTRADO DINAMICO DEPENDIENDO LA PROPIEDAD//
      let orderBy = req.query.orderBy;
      console.log(orderBy);
      let filter = req.query.filter;
      const allUsers = await this.model.service({ filter, orderBy });
      return res.success200(allUsers);
    } catch (error) {
      return next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const oneUser = await this.model.service(uid);
      return res.success200(oneUser);
    } catch (error) {
      return next(error);
    }
  };

  readByEmail = async (req, res, next) => {
    try {
      const { email, oid } = req.params;
      const oneUser = await this.model.service(email, oid);
      return res.success200(oneUser);
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const data = req.body;
      const oneUser = await this.model.service(uid, data);
      return res.success200(oneUser);
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const oneUser = await this.model.service(uid);
      return res.success200(oneUser);
    } catch (error) {
      return next(error);
    }
  };
}

export default UsersController;
const userController = new UsersController();
const { create, read, readOne, readByEmail, update, destroy } = userController;
export { create, read, readOne, readByEmail, update, destroy };
