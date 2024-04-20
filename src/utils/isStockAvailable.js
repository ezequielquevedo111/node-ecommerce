import products from "../data/mongo/products.mongo.js";
import CustomError from "./errors/CustomError.js";
import errors from "./errors/errors.js";
//Verificas si existe stock suficiente para crear la order//
const isStockAvailable = async (dataBody) => {
  try {
    console.log(dataBody.productId);
    const product = await products.readOne(dataBody.productId);
    if (product && product.stock >= dataBody.quantity) {
      return dataBody;
    } else {
      // const error = new Error(
      //   "Unable to create the order, insufficient stock."
      // );
      dataBody = null;
      CustomError.new(errors.notStock);

      // error.statusCode = 404;
      // throw error;
    }
  } catch (error) {
    throw error;
  }
};
export default isStockAvailable;
