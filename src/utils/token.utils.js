import jwt from "jsonwebtoken";

const createToken = (data) => {
  const token = jwt.sign(data, process.env.SECRET, {
    expiresIn: 60 * 60 * 24 * 7,
  });
  return token;
};

const verifyToken = (token) => {
  if (token) {
    const data = jwt.verify(token, process.env.SECRET);
    return data;
  }
  const error = new Error("Bad auth");
  error.statusCode = 401;
  throw error;
};

export { createToken, verifyToken };
