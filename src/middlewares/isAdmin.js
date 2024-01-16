export default (req, res, next) => {
  try {
    const { role } = req.body;
    if (role === "admin") {
      return next();
    } else {
      const error = new Error(
        "You should be an admin to get access to create a new product."
      );

      error.statusCode = 403;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
