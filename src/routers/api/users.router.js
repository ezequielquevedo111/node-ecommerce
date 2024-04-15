import propsUsers from "../../middlewares/propsUsers.js";
import CustomRouter from "../CustomRouter.js";
import {
  create,
  read,
  readOne,
  readByEmail,
  update,
  destroy,
} from "../../controllers/users.controller.js";

// Endpoints - Users //

export default class UsersRouter extends CustomRouter {
  init() {
    //CREATE USER WITH POST//
    this.create("/", ["PUBLIC"], propsUsers, create);

    //GET ALL USERS//
    this.read("/", ["PUBLIC"], read);

    //GET USER BY ID//
    this.read("/:uid", ["ADMIN", "PREM", "USER"], readOne);

    //GET USER BY EMAIL//
    this.read("/:uid/:email", ["ADMIN", "PREM", "USER"], readByEmail);

    //UPDATE USER //

    this.update("/:uid", ["USER", "ADMIN", "PREM"], update);

    //DELETE USER//
    this.destroy("/:uid", ["ADMIN", "PREM"], destroy);
  }
}

