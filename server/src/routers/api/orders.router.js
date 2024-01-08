import { Router } from "express";
import orders from "../../data/fs/orders.Fs.Manager.js";
const ordersRouter = Router();

// ENDPOINTS //

//CREATE A ORDER WITH POST//
ordersRouter.post("/", async (req, res) => {
  try {
    const dataOrder = req.body;
    const response = await orders.create(dataOrder);
    if (
      response ===
      "Values pid, uid, and quantity are required, and the quantity value must be of type number."
    ) {
      return res.json({
        statusCode: 400,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 201,
        response,
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

//GET THE ALL ORDERS FROM ONE USER BY ID//
ordersRouter.get("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const allOrders = await orders.readOne(uid);
    if (allOrders.length === 0) {
      return res.json({
        statusCode: 404,
        message: "No existing orders.",
      });
    } else {
      return res.json({
        statusCode: 200,
        response: allOrders,
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

//DELETE A ORDERS BY ID//
ordersRouter.delete("/:oid", async (req, res) => {
  try {
    const { oid } = req.params;
    const oneOrder = await orders.destroy(oid);
    if (oneOrder === "No existing order found with the entered order ID.") {
      return res.json({
        statusCode: 404,
        message: oneOrder,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: `Deleted order with ID: ${oneOrder}`,
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

export default ordersRouter;
