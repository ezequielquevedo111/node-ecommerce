import { socketServer } from "../../server.js";
import products from "../data/fs/product.Fs.Manager.js";
import propsProductsUtils from "./propsProducts.util.js";
export default async (socket) => {
  console.log(`client ${socket.id} connected`);
  socket.emit("products", await products.read());
  socket.on("new product", async (data) => {
    try {
      propsProductsUtils(data);
      await products.create(data);
      socketServer.emit("products", await products.read());
    } catch (error) {
      console.log(error);
    }
  });
};
