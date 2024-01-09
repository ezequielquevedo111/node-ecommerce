import fs from "fs";
import crypto from "crypto";
import products from "./product.Fs.Manager.js";
const settings = "utf-8";

class OrdersManager {
  static #orders = [];
  constructor(path) {
    this.path = path;
    this.isExist();
  }

  //METODO PARA VALIDAR SI EXISTE EL ARCHIVO O NO//
  isExist() {
    const exist = fs.existsSync(this.path, settings);
    if (exist) {
      const readContent = fs.readFileSync(this.path, settings);
      OrdersManager.#orders = JSON.parse(readContent);
    } else {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    }
  }

  //METODO CREADOR CON VALIDACIONES//
  create(data) {
    try {
      const product = OrdersManager.getProductById(products, data.pid);

      //VERIFICO SI EL PRODUCTO EXISTE//
      if (!product) {
        throw new Error("Product not found for the given order.");
      }

      //VERIFICO SI HAY STOCK DISPONIBLE PARA CREAR LA ORDEN//
      if (data.quantity > product.stock) {
        throw new Error("Not enough stock available for this order.");
      }

      const order = {
        oid: crypto.randomBytes(12).toString("hex"),
        pid: data.pid,
        uid: data.uid,
        quantity: data.quantity,
        state: "pending",
      };

      OrdersManager.#orders.push(order);
      const dataOrder = JSON.stringify(OrdersManager.#orders, null, 2);
      fs.writeFileSync(this.path, dataOrder);
      return order;
    } catch (error) {
      console.log(error.message);
      error.statusCode = 404;
      throw error;
    }
  }

  //METODO PARA LEER TODO//
  async read() {
    try {
      if (OrdersManager.#orders.length === 0) {
        throw new Error("No existing orders.");
      }
      const data = await fs.promises.readFile(this.path, {
        encoding: settings,
      });
      const orders = JSON.parse(data);
      return orders;
    } catch (error) {
      console.log(error.message);
      error.statusCode = 404;
      throw error;
    }
  }

  //METODO PARA LEER LAS ORDENES DE UN USUARIO//
  async readOne(uid) {
    try {
      const data = await fs.promises.readFile(this.path, {
        encoding: settings,
      });
      const orders = JSON.parse(data);

      const userOrders = orders.filter((order) => order.uid === uid);

      if (userOrders.length === 0) {
        throw new Error("No existing orders found with the entered user ID.");
      } else {
        return userOrders;
      }
    } catch (error) {
      console.log(error.message);
      error.statusCode = 404;
      throw error;
    }
  }

  //METODO PARA ELIMINAR UNA ORDEN POR ID//
  async destroy(oid) {
    try {
      const oneOrder = OrdersManager.#orders.find((order) => order.oid === oid);
      if (!oneOrder || OrdersManager.#orders.length === 0) {
        throw new Error("No existing order found with the entered order ID.");
      } else {
        OrdersManager.#orders = OrdersManager.#orders.filter(
          (order) => order.oid !== oneOrder.oid
        );
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(OrdersManager.#orders, null, 2),
          { encoding: settings }
        );
      }
      console.log("Deleted order with ID: " + oid);
      return oid;
    } catch (error) {
      console.log(error.message);
      error.statusCode = 404;
      throw error;
    }
  }

  // OBTENGO EL PRODUCTO QUE LUEGO LE DESCONTARÉ EL STOCK //
  static async getProductById(pid) {
    try {
      const allProducts = await products.read();
      if (!allProducts) {
        throw new Error("No available existing products");
      } else {
        const oneProduct = allProducts.find((product) => product.id === pid);
        return oneProduct;
      }
    } catch (error) {
      console.log(error.message);
      error.statusCode = 404;
      throw error;
    }
  }

  //ACTUALIZO QUANTITY O STATE DE ORDEN DEPENDIENDO DEL VALOR INGRESADO//
  async update(oid, quantity, state) {
    try {
      const oneOrder = OrdersManager.#orders.find((order) => order.oid === oid);

      if (!oneOrder) {
        throw new Error("No existing order found with the entered order ID.");
      }

      const isOrderFinalized = oneOrder.state === "purchased";

      // ACTUALIZA LA QUANTITY POR VALOR Y SI EL STATE/ORDEN NO ESTÁ FINALIZADA//
      if (
        quantity !== undefined &&
        typeof quantity === "number" &&
        !isOrderFinalized
      ) {
        oneOrder.quantity = quantity;
        console.log("Quantity updated successfully");
      }

      // ACTUALIZA EL STATE DEPENDIENDO DEL VALOR INGRESADO//
      if (state !== undefined && typeof state === "string") {
        oneOrder.state = state;
        console.log("Order state updated successfully");

        // AJUSTO EL STOCK DEL PRODUCTO //
        if (state.toLowerCase() === "purchased") {
          const product = await OrdersManager.getProductById(oneOrder.pid);

          if (product) {
            if (product.stock >= oneOrder.quantity) {
              product.stock -= oneOrder.quantity;
              await products.update(oneOrder.pid, product);
              console.log("Product stock updated successfully");
            } else {
              throw new Error("Not enough stock available for this order.");
            }
          } else {
            throw new Error("Product not found for the given order.");
          }
        }
      }

      console.log(oneOrder);

      // VALIDAMOS SI LA ORDEN ESTÁ FINALIZADA //
      if (isOrderFinalized) {
        throw new Error("Cannot update a finalized order.");
      }

      //SI SE RESUELVE CORRECTAMENTE GUARDAMOS LOS CAMBIOS EN EL JSON//
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(OrdersManager.#orders, null, 2),
        { encoding: settings }
      );

      return oneOrder;
    } catch (error) {
      console.log(error.message);
      error.statusCode = 404;
      throw error;
    }
  }
}

const orders = new OrdersManager("./server/src/data/fs/files/orders.Fs.json");

// orders.create({
//   pid: "513e60a5b0a2ab432d662136",
//   uid: "9bced94e5f95b7984981d737",
//   quantity: 10,
// });

// console.log(await orders.read());
// await orders.destroy("eee222c000ca31ac745894c8");

//Comentado el update porque cuando inicias nodemon se crea un loop porque ejecuta la siguiente linea//
// await orders.update("37d035f2d4ef4621e1fe7a2b", 50, "purchased");

export default orders;
