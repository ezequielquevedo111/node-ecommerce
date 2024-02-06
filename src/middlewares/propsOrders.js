const propsOrders = (req, res, next) => {
  const { productId, userId, quantity } = req.body;
  if (
    !(
      typeof productId === "string" &&
      typeof userId === "string" &&
      quantity !== undefined &&
      typeof quantity === "number"
    )
  ) {
    return res.json({
      statusCode: 400,
      response: `${req.method} ${req.baseUrl}${req.route.path}: Values productId, userId, and quantity are required, and the quantity value must be of type number.`,
    });
  } else {
    return next();
  }
};

export default propsOrders;
