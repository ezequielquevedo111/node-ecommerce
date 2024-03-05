import { products } from "../../data/mongo/manager.mongo.js";
import SessionsRouter from "./sessions.views.js";
import CustomRouter from "../CustomRouter.js";
import OrdersRouter from "./orders.views.js";
import ProductsRouter from "./products.views.js";

const orders = new OrdersRouter();
const ordersRouter = orders.getRouter();
const productsView = new ProductsRouter();
const productsRouter = productsView.getRouter();
const sessions = new SessionsRouter();
const sessionsRouter = sessions.getRouter();

export default class ViewsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const orderAndPaginate = {
          limit: req.query.limit || 10,
          page: req.query.page || 1,
          sort: { price: 1 },
        };
        const filter = {};
        if (req.query.title) {
          filter.title = new RegExp(req.query.title.trim(), "i");
        }

        if (req.query.price === "desc") {
          orderAndPaginate.sort.price = -1;
        }

        let allProducts = await products.read({ filter, orderAndPaginate });
        const {
          docs,
          totalPages,
          page,
          hasPrevPage,
          hasNextPage,
          prevPage,
          nextPage,
        } = allProducts;

        const pagesArray = Array.from({ length: totalPages }, (_, i) => ({
          pageNumber: i + 1,
          isCurrent: i + 1 === page,
        }));

        return res.render("index", {
          docs,
          pagesArray,
        });
      } catch (error) {
        next(error);
      }
    });
    this.router.use("/products", productsRouter);
    this.router.use("/orders", ordersRouter);
    this.router.use("/sessions", sessionsRouter);
  }
}
