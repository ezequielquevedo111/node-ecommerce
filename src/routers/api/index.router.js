import { Router } from "express";
import productsRouter from "./products.router.js";
import usersRouter from "./users.router.js";
import ordersRouter from "./orders.router.js";
import sessionsRouter from "./sessionsRouter.api.js";
import passport from "../../middlewares/passport.js";

const apiRouter = Router();

apiRouter.use("/products", productsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use(
  "/orders",
  passport.authenticate("jwt", { session: false }),
  ordersRouter
);
apiRouter.use("/sessions", sessionsRouter);

export default apiRouter;
