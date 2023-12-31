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
          (product) => product.id !== product.id
        );
        console.log("Deleted product with ID: " + product.id);
        return oneProduct.id;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const product = new ProductManager();

product.create({
  title: "Notebook ASUS",
  photo: "/desktop/productImages/notebook.jpg",
  price: 10000,
  stock: 5,
});

product.create({
  title: "Teclado HyperX",
  photo: "/desktop/productImages/keyboard_Hyper_X.jpg",
  price: 5000,
  stock: 20,
});

console.log(product.read());
console.log(product.readOne(2));
product.destroy("be143835f2ecf4202c74f680");
