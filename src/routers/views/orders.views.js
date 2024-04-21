// import passCallBack from "../../middlewares/passCallBack.js";
import orders from "../../data/mongo/orders.mongo.js";
import users from "../../data/mongo/users.mongo.js";
import CustomRouter from "../CustomRouter.js";

export default class OrdersRouter extends CustomRouter {
  init() {
    this.read("/", ["USER"], async (req, res, next) => {
      try {
        const opts = {
          limit: req.query.limit || 10,
          page: req.query.page || 1,
          sort: { title: 1 },
          lean: true,
        };
        const one = await users.readByEmail(req.user.email);
        const filter = {
          userId: one._id,
        };
        const allOrders = await orders.read({ filter, opts });
        return res.render("orders", {
          title: "My orders",
          orders: allOrders.docs,
        });
      } catch (error) {
        return res.render("orders", {
          title: "My orders",
          message:
            "You haven't placed any orders yet. Go to the home page to start your purchase.",
        });
      }
    });
  }
}
