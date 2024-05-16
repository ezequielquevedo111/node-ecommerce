import crypto from "crypto";
import winston from "../../utils/logger/winston.utils.js";

class OrdersManager {
  static #orders = [];
  constructor() {}

  //METODO CREADOR CON VALIDACIONES//
  create(data) {
    try {
      if (
        !data.productId ||
        !data.userId ||
        (!data.quantity && typeof data.quantity !== "string")
      ) {
        throw new Error(
          "Values productId, userId, and quantity are required, and the quantity value must be of type number."
        );
      } else {
        const product = OrdersManager.getProductById(products, data.productId);

        //VERIFICO SI EL PRODUCTO EXISTE//
        if (!product) {
          throw new Error("Product not found for the given order.");
        }

        //VERIFICO SI HAY STOCK DISPONIBLE PARA CREAR LA ORDEN//
        if (data.quantity > product.stock) {
          throw new Error("Not enough stock available for this order.");
        }

        const order = {
          orderId: crypto.randomBytes(12).toString("hex"),
          productId: data.productId,
          userId: data.userId,
          quantity: data.quantity,
          state: 1,
        };

        OrdersManager.#orders.push(order);
        return order;
      }
    } catch (error) {
      return error.message;
    }
  }

  //METODO PARA LEER TODO//
  read() {
    return OrdersManager.#orders;
  }

  //METODO PARA LEER LAS ORDENES DE UN USUARIO//
  readOne(uid) {
    try {
      const userOrders = OrdersManager.#orders.filter(
        (order) => order.userId === uid
      );
      if (userOrders.length === 0) {
        throw new Error("No existing orders found with the entered user ID.");
      } else {
        return userOrders;
      }
    } catch (error) {
      return error.message;
    }
  }

  //METODO PARA ELIMINAR UNA ORDEN POR ID//
  destroy(oid) {
    try {
      const oneOrder = OrdersManager.#orders.find(
        (order) => order.orderId === oid
      );
      if (!oneOrder) {
        throw new Error("No existing order found with the entered order ID.");
      } else {
        OrdersManager.#orders = OrdersManager.#orders.filter(
          (order) => order.orderId !== oneOrder.orderId
        );
        winston.INFO("Deleted order with ID: " + oneOrder.orderId);
      }
    } catch (error) {
      return error.message;
    }
  }
  // OBTENGO EL PRODUCTO QUE LUEGO LE DESCONTARÉ EL STOCK //
  static getProductById(products, pid) {
    const oneProduct = products.find((product) => product.id === pid);
    return oneProduct;
  }

  //ACTUALIZO QUANTITY O STATE DE ORDEN DEPENDIENDO DEL VALOR INGRESADO//
  update(oid, quantity, state) {
    try {
      const oneOrder = OrdersManager.#orders.find(
        (order) => order.orderId === oid
      );

      if (!oneOrder) {
        throw new Error("No existing order found with the entered order ID.");
      }

      const isOrderFinalized = oneOrder.state === 3;

      // ACTUALIZA LA QUANTITY POR VALOR Y SI EL STATE/ORDEN NO ESTÁ FINALIZADA//
      if (
        quantity !== undefined &&
        typeof quantity === "number" &&
        !isOrderFinalized
      ) {
        oneOrder.quantity = quantity;
        winston.INFO("Quantity updated successfully");
      }

      // ACTUALIZA EL STATE DEPENDIENDO DEL VALOR INGRESADO//
      if (state !== undefined && typeof state === "number") {
        oneOrder.state = state;
        winston.INFO("Order state updated successfully");

        // AJUSTO EL STOCK DEL PRODUCTO //
        if (state === 3) {
          const product = OrdersManager.getProductById(
            products,
            oneOrder.productId
          );

          if (product) {
            if (product.stock >= oneOrder.quantity) {
              product.stock -= oneOrder.quantity;
              winston.INFO("Product stock updated successfully");
            } else {
              throw new Error("Not enough stock available for this order.");
            }
          } else {
            throw new Error("Product not found for the given order.");
          }
        }
      }

      winston.INFO(oneOrder);

      // VALIDAMOS SI LA ORDEN ESTÁ FINALIZADA //
      if (isOrderFinalized) {
        throw new Error("Cannot update a finalized order.");
      }

      return oneOrder;
    } catch (error) {
      winston.WARN(error.message);
      return error.message;
    }
  }
}

const order = new OrdersManager();

const products = [
  {
    id: "696abf5b72e3f7427fbd8ec9",
    title: "PC AMD",
    photo: "./desktop/photos/tv.png",
    price: 11000,
    stock: 500,
  },
];

const order1 = order.create({
  productId: "696abf5b72e3f7427fbd8ec9",
  userId: "a7980dc795a629815043076c",
  quantity: 300,
});

const order2 = order.create({
  productId: "696abf5b72e3f7427fbd8ec9",
  userId: "a7980dc795a629815043076c",
  quantity: 10,
});

order.update(order1.orderId, 20, 3);
