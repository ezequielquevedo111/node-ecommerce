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
  async create(data) {
    try {
      const product = await products.readOne(data.productId);

      //VERIFICO SI EL PRODUCTO EXISTE//
      if (!product) {
        throw new Error("Product not found for the given order.");
      }

      //VERIFICO SI HAY STOCK DISPONIBLE PARA CREAR LA ORDEN//
      if (data.quantity > product.stock) {
        throw new Error("Not enough stock available for this order.");
      }

      const order = {
        _id: crypto.randomBytes(12).toString("hex"),
        productId: data.productId,
        userId: data.userId,
        quantity: data.quantity,
        state: data.state || 1,
      };

      OrdersManager.#orders.push(order);
      const dataOrder = JSON.stringify(OrdersManager.#orders, null, 2);
      await fs.promises.writeFile(this.path, dataOrder);
      return order;
    } catch (error) {
      error.statusCode = 404;
      throw error;
    }
  }

  //METODO PARA LEER TODO//
  // async read() {
  //   try {
  //     if (OrdersManager.#orders.length === 0) {
  //       throw new Error("No existing orders.");
  //     }
  //     const data = await fs.promises.readFile(this.path, {
  //       encoding: settings,
  //     });
  //     const orders = JSON.parse(data);
  //     return orders;
  //   } catch (error) {
  //     console.log(error.message);
  //     error.statusCode = 404;
  //     throw error;
  //   }
  // }

  async read(obj) {
    try {
      const { filter, orderAndPaginate } = obj;
      let allDocs = await fs.readFileSync(this.path, "utf-8");
      let data = JSON.parse(allDocs);
      if (data.length === 0) {
        const error = new Error("There are no documents available.");
        error.statusCode = 404;
        throw error;
      } else {
        if (filter && filter.state) {
          data = data.filter((order) => order.state === filter.state);
        }
        if (orderAndPaginate) {
          const { sortBy, sortOrder } = orderAndPaginate;
          data.sort((a, b) => {
            if (sortOrder === "asc") {
              return a[sortBy] - b[sortBy];
            } else if (sortOrder === "desc") {
              return b[sortBy] - a[sortBy];
            }
          });
        }
        return data;
      }
    } catch (error) {
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

      const userOrders = orders.filter((order) => order.userId === uid);

      if (userOrders.length === 0) {
        throw new Error("No existing orders found with the entered user ID.");
      }

      return userOrders;
    } catch (error) {
      throw error;
    }
  }

  //METODO PARA ELIMINAR UNA ORDEN POR ID//
  async destroy(oid) {
    try {
      const oneOrder = OrdersManager.#orders.find((order) => order._id === oid);
      if (!oneOrder || OrdersManager.#orders.length === 0) {
        throw new Error("No existing order found with the entered order ID.");
      } else {
        OrdersManager.#orders = OrdersManager.#orders.filter(
          (order) => order._id !== oneOrder._id
        );
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(OrdersManager.#orders, null, 2),
          { encoding: settings }
        );
      }
      return oneOrder;
    } catch (error) {
      throw error;
    }
  }

  // OBTENGO EL PRODUCTO QUE LUEGO LE DESCONTARÉ EL STOCK //
  // static async getProductById(pid) {
  //   try {
  //     const data = await products.readOne(pid);
  //     console.log(data);

  //     const oneProduct = data.find((product) => product._id === pid);
  //     return oneProduct;
  //   } catch (error) {
  //     console.log(error.message);
  //     error.statusCode = 404;
  //     throw error;
  //   }
  // }

  //ACTUALIZO QUANTITY O STATE DE ORDEN DEPENDIENDO DEL VALOR INGRESADO//
  async update(oid, quantity, state) {
    try {
      const oneOrder = OrdersManager.#orders.find((order) => order._id === oid);
      // console.log(oneOrder);
      if (!oneOrder) {
        throw new Error("No existing order found with the entered order ID.");
      }

      const isOrderFinalized = oneOrder.state === 3; //cambiar esta

      // ACTUALIZA LA QUANTITY POR VALOR Y SI EL STATE/ORDEN NO ESTÁ FINALIZADA//
      if (
        quantity !== undefined &&
        typeof quantity === "number" &&
        !isOrderFinalized
      ) {
        oneOrder.quantity = quantity;
        // console.log("Quantity updated successfully");
      }

      // ACTUALIZA EL STATE DEPENDIENDO DEL VALOR INGRESADO//
      if (state !== undefined && typeof state === "number") {
        //Cambiar esta
        oneOrder.state = state;
        // console.log("Order state updated successfully");

        // AJUSTO EL STOCK DEL PRODUCTO //
        if (state === 3) {
          //Cambiar esta
          const product = await products.readOne(oneOrder.productId);

          if (product) {
            if (product.stock >= oneOrder.quantity) {
              product.stock -= oneOrder.quantity;
              await products.update(oneOrder.productId, product);
              // console.log("Product stock updated successfully");
            } else {
              throw new Error("Not enough stock available for this order.");
            }
          } else {
            throw new Error("Product not found for the given order.");
          }
        }
      }

      // console.log(oneOrder);

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
      // console.log(error.message);
      error.statusCode = 404;
      throw error;
    }
  }
}

const orders = new OrdersManager("./src/data/fs/files/orders.Fs.json");

export default orders;
