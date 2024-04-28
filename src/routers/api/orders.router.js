import propsOrders from "../../middlewares/propsOrders.js";
// import passCallBack from "../../middlewares/passCallBack.js";
import CustomRouter from "../CustomRouter.js";
import {
  create,
  read,
  update,
  destroy,
  report,
} from "../../controllers/orders.controller.js";
// ENDPOINTS //

export default class OrdersRouter extends CustomRouter {
  init() {
    //CREATE A ORDER WITH POST//
    this.create("/", ["USER"], propsOrders, create);

    //GET THE ALL ORDERS FROM ONE USER BY ID//
    this.read("/:uid", ["USER"], read);

    //DELETE A ORDERS BY ID//
    this.destroy("/:oid", ["USER"], destroy);

    //REDUCIR EL CODIGO PARA QUE NO QUEDE TODO DENTRO DEL ENDPOINT - VERIFICAR DE HACERLO CON BODY EN VEZ DE QUERY//
    //UPDATE A ORDERS BY ID//
    this.update("/:oid", ["USER"], update);

    this.read("/report/:uid", ["USER"], report);
  }
}
