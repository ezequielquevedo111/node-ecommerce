// import { orders } from "../data/mongo/manager.mongo.js";
// import isStockAvailable from "../utils/isStockAvailable.js";
import isPropUpdate from "../utils/isPropUpdate.js";
import service from "../services/orders.service.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";
import isOrderCompleted from "../utils/isOrderCompleted.js";

class OrdersController {
  constructor() {
    this.service = service;
  }

  create = async (req, res, next) => {
    try {
      let dataBody = req.body;
      // let dataOrder = await isStockAvailable(dataBody);
      //VER COMO MODIFICAR PARA QUE NO SE CONECTE CON LA PERSISTENCIA//
      // YA QUE SE TENDRÍA QUE AGREGAR A LA CAPA DE SERVICE//

      const response = await this.service.create(dataBody);
      return res.success201(response);
    } catch (error) {
      return next(error);
    }
  };

  read = async (req, res, next) => {
    try {
      const { uid } = req.params;
      let filter = { userId: uid };
      let orderAndPaginate = {
        limit: req.query.limit || 10,
        page: req.query.page || 1,
        sort: { state: 1 },
      };
      if (req.query.state === "desc") {
        orderAndPaginate.sort.state = -1;
      }
      const allOrders = await this.service.read({ filter, orderAndPaginate });
      if (allOrders.docs.length > 0) {
        return res.success200(allOrders);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const propUpdate = isPropUpdate(req);
      const oneOrder = await this.service.update(id, propUpdate);
      if (oneOrder) {
        return res.success200(oneOrder);
      } else if (doc.hasOwnProperty("state")) {
        const stockUpdate = await isOrderCompleted(doc, data);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { oid } = req.params;
      console.log(req.params);
      const oneOrder = await this.service.destroy(oid);
      if (oneOrder) {
        return res.success200(oneOrder);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };

  report = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const report = await this.service.report(uid);
      if (report) {
        return res.success200(report);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };
}

export default OrdersController;
const orderController = new OrdersController();
const { create, read, update, destroy, report } = orderController;
export { create, read, update, destroy, report };
