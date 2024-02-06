import { products } from "../data/mongo/manager.mongo.js";

const isStockAvailable = async (dataBody) => {
  try {
    console.log(dataBody.productId);
    const product = await products.readOne(dataBody.productId);
    if (product && product.stock >= dataBody.quantity) {
      return dataBody;
    } else {
      const error = new Error(
        "Unable to create the order, insufficient stock."
      );
      dataBody = null;
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    throw error;
  }
};
export default isStockAvailable;
