import { orders, products } from "../data/mongo/manager.mongo.js";
import Product from "../data/mongo/models/product.model.js";

const isOrderCompleted = async (doc, data) => {
  try {
    const order = await orders.readOne(data);
    const product = await products.readOne(order.productId);

    if (
      product &&
      order &&
      product.stock >= order.quantity &&
      order.state === 3
    ) {
      product.stock -= order.quantity;

      // Utiliza el método findByIdAndUpdate correctamente
      const dataUpdate = await Product.findByIdAndUpdate(
        product._id,
        { stock: product.stock }, // Aquí especifica las actualizaciones en un objeto
        { new: true }
      );

      if (!dataUpdate) {
        const error = new Error("Failed to update product stock.");
        error.statusCode = 500;
        throw error;
      }

      return dataUpdate;
    } else {
      const error = new Error(
        "Cannot update a product, please enter a valid order."
      );
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

export default isOrderCompleted;
