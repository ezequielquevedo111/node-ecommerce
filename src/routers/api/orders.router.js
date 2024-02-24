import { Router } from "express";
import { orders } from "../../data/mongo/manager.mongo.js";
import propsOrders from "../../middlewares/propsOrders.js";

import isPropUpdate from "../../utils/isPropUpdate.js";
import isStockAvailable from "../../utils/isStockAvailable.js";
const ordersRouter = Router();

// ENDPOINTS //

//CREATE A ORDER WITH POST//
ordersRouter.post("/", propsOrders, async (req, res, next) => {
  try {
    let dataBody = req.body;
    let dataOrder = await isStockAvailable(dataBody);
    const response = await orders.create(dataOrder);
    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

//GET THE ALL ORDERS FROM ONE USER BY ID//
ordersRouter.get("/:uid", async (req, res, next) => {
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
    const allOrders = await orders.read({ filter, orderAndPaginate });

    return res.json({
      statusCode: 200,
      response: allOrders,
    });
  } catch (error) {
    return next(error);
  }
});

//DELETE A ORDERS BY ID//
ordersRouter.delete("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const oneOrder = await orders.destroy(oid);
    return res.json({
      statusCode: 200,
      response: `Deleted order with ID: ${oneOrder}`,
    });
  } catch (error) {
    return next(error);
  }
});

//REDUCIR EL CODIGO PARA QUE NO QUEDE TODO DENTRO DEL ENDPOINT - VERIFICAR DE HACERLO CON BODY EN VEZ DE QUERY//
//UPDATE A ORDERS BY ID//
ordersRouter.put("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    // const data = await isOrderFound(oid);
    // console.log(data);
    const propUpdate = isPropUpdate(req);
    const oneOrder = await orders.updateOrder(oid, propUpdate, req);
    return res.json({
      statusCode: 200,
      response: `Updated order with ID: ${oneOrder._id}`,
    });
  } catch (error) {
    return next(error);
  }
});


ordersRouter.get("/report/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const report = await orders.report(uid);
    return res.json({
      statusCode: 200,
      response: report,
    });
  } catch (error) {
    return next(error);
  }
});


export default ordersRouter;
