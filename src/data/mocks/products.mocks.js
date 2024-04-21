// import "dotenv/config.js";
import repository from "../../repositories/products.rep.js";
// import dbConnection from "../../utils/db.js";
import { faker } from "@faker-js/faker";
import winston from "../../utils/logger/winston.utils.js";
// import env from "../../u tils/envt.utils.js";

const productMock = () => {
  return {
    title: faker.commerce.productName(),
    photo: faker.image.url(),
    price: faker.commerce.price({ min: 10000, max: 20000000, dec: 0 }),
    stock: faker.number.int({ min: 1000 }),
  };
};

const createMocks = async () => {
  //   await dbConnection(env);
  for (let i = 0; i < 1; i++) {
    const data = productMock();
    await repository.create(data);
  }
  winston.INFO("100 products created");
};

createMocks();
