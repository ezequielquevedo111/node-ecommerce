const isValidPassUtil = (formPassword, dbPassword) => {
  if (formPassword !== dbPassword) {
    const error = new Error("Invalid credentials, please try again");
    error.statusCode = 401;
    throw error;
  }
};

export default isValidPassUtil;
