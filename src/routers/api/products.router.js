import CustomRouter from "../CustomRouter.js";
import passCallBack from "../../middlewares/passCallBack.js";
import {
  create,
  read,
  readOne,
  update,
  destroy,
} from "../../controllers/products.controller.js";

export default class ProductsRouter extends CustomRouter {
  init() {
    //CREATE PRODUCT WITH POST//
    this.create("/", ["ADMIN", "PREM"], passCallBack("jwt"), create);

    //GET ALL PRODUCTS//
    this.read("/", ["PUBLIC"], read);

    //GET ONE PRODUCT BY ID//
    this.read("/:pid", ["PUBLIC"], readOne);

    //UPDATE A PRODUCT BY ID//
    this.update("/:pid", ["ADMIN", "PREM"], update);

    //DELETE PRODUCT BY ID//
    this.destroy("/:pid", ["ADMIN", "PREM"], destroy);
  }
}
