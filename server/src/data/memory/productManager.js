import crypto from "crypto";

class ProductManager {
  static #products = [];
  constructor() {}
  //METODO CREADOR//
  create(data) {
    const product = {
      id: crypto.randomBytes(12).toString("hex"),
      title: data.title,
      photo: data.photo,
      price: parseInt(data.price),
      stock: parseInt(data.stock),
    };
    ProductManager.#products.push(product);
    return product;
  }

  //METODO PARA LEER TODO//
  read() {
    return ProductManager.#products;
  }
  //METODO PARA LEER  POR ID//

  readOne(id) {
    return ProductManager.#products.find((product) => product.id === id);
  }

  //METODO PARA ELIMINAR UN ARCHIVO POR ID CON VALIDACIONES//
  destroy(id) {
    try {
      const oneProduct = ProductManager.#products.find(
        (product) => product.id === id
      );
      if (!oneProduct) {
        throw new Error("There isn't a product with ID: " + id);
      } else {
        ProductManager.#products = ProductManager.#products.filter(
          (product) => product.id !== oneProduct.id
        );
        console.log("Deleted product with ID: " + oneProduct.id);
        return oneProduct.id;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  //METODO PARA ACTUALIZAR ARCHIVO POR ID CON VALIDACIONES//
  update(id, data) {
    try {
      const oneProduct = ProductManager.#products.find(
        (product) => product.id === id
      );
      if (
        !oneProduct ||
        !(
          data.hasOwnProperty("title") ||
          data.hasOwnProperty("photo") ||
          data.hasOwnProperty("price") ||
          data.hasOwnProperty("stock")
        ) ||
        (data.hasOwnProperty("price") && typeof data.price !== "number") ||
        (data.hasOwnProperty("stock") && typeof data.stock !== "number")
      ) {
        throw new Error(
          `There isn't a product with ID: ${id}, or there isn't a property named as title, photo, price, or stock. Also, ensure that the values entered for price or stock are of numeric type`
        );
      } else {
        for (const prop in data) {
          switch (prop) {
            case "title":
              oneProduct.title = data.title;
              break;
            case "photo":
              oneProduct.photo = data.photo;
              break;
            case "price":
              oneProduct.price = data.price;
              break;
            case "stock":
              oneProduct.stock = data.stock;
              break;
          }
        }
        return oneProduct;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const product = new ProductManager();

const product1 = product.create({
  title: "Notebook ASUS",
  photo: "/desktop/productImages/notebook.jpg",
  price: 10000,
  stock: 5,
});

const product2 = product.create({
  title: "Teclado HyperX",
  photo: "/desktop/productImages/keyboard_Hyper_X.jpg",
  price: 5000,
  stock: 20,
});

console.log(product2);

product.update(product2.id, { title: "Mouse Redragon", stock: 50 });
console.log(product.read());
console.log(product.readOne(product1.id));
product.destroy(product1.id);
product.destroy("asdsds");
