import { Router } from "express";
import { products } from "../../data/mongo/manager.mongo.js";
import sessionsRouter from "./sessions.views.js";
import productsRouter from "./products.views.js";
import { verifyToken } from "../../utils/token.utils.js";
import Handlebars from "../../utils/hbs.helper.js";
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
    const userRole = req.user ? req.user.role : 3;

    const pagesArray = Array.from({ length: totalPages }, (_, i) => ({
      pageNumber: i + 1,
      isCurrent: i + 1 === page,
    }));

    return res.render("index", {
      docs,
      pagesArray,
      userRole,
    });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/products", productsRouter);

// viewsRouter.use("/orders", ordersRouter);

viewsRouter.use("/sessions", sessionsRouter);

export default viewsRouter;

//VER COMO PASARLE EL ROL A LA VISTA PARA QUE DIRECTAMENTE
//NO LA RENDERICE O NO TE DEJE INGRESAR O TE REDIRIJA

//VER SI PUEDO SETEAR EL ROL CON COOKIES//
//ARMAR PAGINA DONDE PUEDA FETCHEAR LAS ORDENES//
//ESO  PUEDO TRAER LAS ORDENES VER LA SIGUIENTE CLASE//
