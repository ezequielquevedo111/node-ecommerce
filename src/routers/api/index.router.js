import passport from "../../middlewares/passport.js";
import CustomRouter from "../CustomRouter.js";
import passCallBack from "../../middlewares/passCallBack.js";
import ProductsRouter from "./products.router.js";
import SessionsRouter from "./sessionsRouter.api.js";
import OrdersRouter from "./orders.router.js";
import UsersRouter from "./users.router.js";

const products = new ProductsRouter();
const productsRouter = products.getRouter();
const sessions = new SessionsRouter();
const sessionsRouter = sessions.getRouter();
const orders = new OrdersRouter();
const ordersRouter = orders.getRouter();
const users = new UsersRouter();
const usersRouter = users.getRouter();

export default class ApiRouter extends CustomRouter {
  init() {
    this.router.use("/products", productsRouter);
    this.router.use("/orders", passCallBack("jwt"), ordersRouter);
    this.router.use("/sessions", sessionsRouter);
    this.router.use("/users", usersRouter);
  }
}
