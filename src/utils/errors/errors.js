const errors = {
  error: { message: "Error", statusCode: 400 },
  userExist: { message: "User already exists!", statusCode: 400 },
  notStock: { message: "Failed to update product stock.", statusCode: 400 },
  invalidToken: { message: "Invalid verified token!", statusCode: 400 },
  passwordLength: {
    message: "The password must be at least 8 characters long",
    statusCode: 400,
  },
  badAuth: { message: "Bad auth", statusCode: 401 },
  invalidCreditials: {
    message: "Invalid credentials, please try again",
    statusCode: 401,
  },
  badAuthPassport: { message: "Bad auth from passport cb!", statusCode: 401 },
  forbidden: { message: "Forbidden", statusCode: 403 },
  notFound: { message: "¡Not found documents!", statusCode: 404 },
  fatal: { message: "Fatal error in server", statusCode: 500 },
};

export default errors;
