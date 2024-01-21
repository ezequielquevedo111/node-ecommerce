const propsUsers = (req, res, next) => {
  const { name, photo, email } = req.body;
  if (
    !name ||
    typeof name !== "string" ||
    !photo ||
    typeof photo !== "string" ||
    !email ||
    typeof email !== "string"
  ) {
    return res.json({
      statusCode: 400,
      response: `${req.method} ${req.baseUrl}${req.route.path}: The values of name, photo, email, price and stock are required and must be of type string.`,
    });
  } else {
    return next();
  }
};

export default propsUsers;
