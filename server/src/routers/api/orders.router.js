import { Router } from "express";
import orders from "../../data/fs/orders.Fs.Manager.js";
import propsOrders from "../../middlewares/propsOrders.js";
const ordersRouter = Router();

// ENDPOINTS //

//CREATE A ORDER WITH POST//
ordersRouter.post("/", propsOrders, async (req, res, next) => {
  try {
    const dataOrder = req.body;
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
    const allOrders = await orders.readOne(uid);
    if (allOrders.length === 0) {
      return res.json({
        statusCode: 404,
        response: "No existing orders.",
      });
    } else {
      return res.json({
        statusCode: 200,
        response: allOrders,
      });
    }
  } catch (error) {
    return next(error);
  }
});

//DELETE A ORDERS BY ID//
ordersRouter.delete("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const oneOrder = await orders.destroy(oid);
    if (oneOrder === "No existing order found with the entered order ID.") {
      return res.json({
        statusCode: 404,
        response: oneOrder,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: `Deleted order with ID: ${oneOrder}`,
      });
    }
  } catch (error) {
    return next(error);
  }
});

export default ordersRouter;
