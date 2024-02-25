import { Router } from "express";
import { products } from "../../data/mongo/manager.mongo.js";
import sessionsRouter from "./sessions.views.js";
import productsRouter from "./products.views.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
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
    console.log(totalPages);

    const pagesArray = Array.from({ length: totalPages }, (_, i) => ({
      pageNumber: i + 1,
      isCurrent: i + 1 === page,
    }));

    return res.render("index", { docs, pagesArray });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/products", productsRouter);

// viewsRouter.use("/orders", ordersRouter);

viewsRouter.use("/sessions", sessionsRouter);

export default viewsRouter;
