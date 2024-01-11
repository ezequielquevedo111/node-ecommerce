const propsOrders = (req, res, next) => {
  const { pid, uid, quantity } = req.body;
  if (
    !(
      typeof pid === "string" &&
      typeof uid === "string" &&
      quantity !== undefined &&
      typeof quantity === "number"
    )
  ) {
    return res.json({
      statusCode: 400,
      response: `${req.method} ${req.baseUrl}${req.route.path}: Values pid, uid, and quantity are required, and the quantity value must be of type number.`,
    });
  } else {
    return next();
  }
};

export default propsOrders;
