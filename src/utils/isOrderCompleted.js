import orders from "../data/mongo/manager.mongo.js"; //cambiar orders ver
//el error//
import Product from "../data/mongo/models/product.model.js";

//VALIDO SI LA ORDER ESTÁ FINALIZADA Y ACTUALIZO EL STOCK DEL PRODUCTO//
const isOrderCompleted = async (doc, data) => {
  try {
    const order = await orders.readOne(data);

    if (order && order.state === 3) {
      const product = doc.productId;
      if (product && product.stock >= order.quantity) {
        product.stock -= order.quantity;

        const dataUpdate = await Product.findByIdAndUpdate(
          product._id,
          { stock: product.stock },
          { new: true }
        );

        if (!dataUpdate) {
          const error = new Error("Failed to update product stock.");
          error.statusCode = 404;
          throw error;
        }

        return dataUpdate;
      }
    }

    const error = new Error(
      "Cannot update product stock, please enter a valid order."
    );
    error.statusCode = 404;
    throw error;
  } catch (error) {
    throw error;
  }
};

export default isOrderCompleted;
