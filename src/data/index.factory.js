import argsUtils from "../utils/args.utils.js";
import dbConnection from "../utils/db.js";
import "dotenv/config.js";
import winston from "../utils/logger/winston.utils.js";

// const enviroment = argsUtils.env;
// const enviroment = "dev";
const { env } = argsUtils;

let dao = {};

switch (env) {
  case "test":
    winston.INFO("test conected");
    const { default: productsTest } = await import(
      "./fs/product.Fs.Manager.js"
    );
    const { default: usersTest } = await import("./fs/user.Fs.Manager.js");
    const { default: ordersTest } = await import("./fs/orders.Fs.Manager.js");
    dao = { products: productsTest, users: usersTest, orders: ordersTest };
    break;

  case "dev":
    //FS
    dbConnection().then(() => winston.INFO("MONGO CONNECTED"));
    const { default: productsDev } = await import("./mongo/products.mongo.js");
    const { default: usersDev } = await import("./mongo/users.mongo.js");
    const { default: ordersDev } = await import("./mongo/orders.mongo.js");
    dao = { products: productsDev, users: usersDev, orders: ordersDev };
    break;
  case "prod":
    dbConnection().then(() => winston.INFO("MONGO CONNECTED"));
    const { default: productsMongo } = await import(
      "./mongo/products.mongo.js"
    );
    const { default: usersMongo } = await import("./mongo/users.mongo.js");
    const { default: ordersMongo } = await import("./mongo/orders.mongo.js");
    dao = { products: productsMongo, users: usersMongo, orders: ordersMongo };
    break;

  default:
    break;
}

export default dao;
