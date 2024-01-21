import propsProductsUtils from "../utils/propsProducts.util.js";

const propsProducts = (req, res, next) => {
  // const { title, photo, price, stock } = req.body;
  // if (
  //   !title ||
  //   typeof title !== "string" ||
  //   !photo ||
  //   typeof photo !== "string" ||
  //   (price !== undefined && typeof price !== "number") ||
  //   (stock !== undefined && typeof stock !== "number")
  // ) {
  //   return res.json({
  //     statusCode: 400,
  //     response: `${req.method} ${req.baseUrl}${req.route.path} : The values of title, photo, price, and stock are required, and price and stock must be of type number.`,
  //   });
  // } else {
  //   return next();
  // }
  try {
    propsProductsUtils(req.body);
    return next();
  } catch (error) {
    return next(error);
  }
};

export default propsProducts;
