const has8charUtils = (password) => {
  if (password.length < 8) {
    const error = new Error("The password must be at least 8 characters long");
    error.statusCode = 400;
    throw error;
  }
};

export default has8charUtils;
