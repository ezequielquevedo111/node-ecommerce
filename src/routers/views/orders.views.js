import passCallBack from "../../middlewares/passCallBack.js";
import { orders, users } from "../../data/mongo/manager.mongo.js";
import CustomRouter from "../CustomRouter.js";

export default class OrdersRouter extends CustomRouter {
  init() {
    this.read("/", ["USER"], passCallBack("jwt"), async (req, res, next) => {
      try {
        const opts = {
          limit: req.query.limit || 10,
          page: req.query.page || 1,
          sort: { title: 1 },
          lean: true,
        };
        console.log(req.user);
        const one = await users.readByEmail(req.user.email);
        // console.log(one);
        const filter = {
          userId: one._id,
        };
        const allOrders = await orders.read({ filter, opts });
        // console.log(allOrders);
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
