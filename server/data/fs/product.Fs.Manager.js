//VALORES INICIALES//
import fs from "fs";
import crypto from "crypto";
const route = "./server/data/fs/files/products.Fs.json";
const settings = "utf-8";

//CLASE CON METODOS//
class ProductManager {
  static #products = [];
  constructor(path) {
    this.path = path;
    this.isExist();
  }

  //METODO PARA VALIDAR SI EXISTE EL ARCHIVO O NO//
  isExist() {
    const exist = fs.existsSync(this.path, settings);
    if (exist) {
      try {
        const readContent = fs.readFileSync(this.path, settings);
        ProductManager.#products = JSON.parse(readContent);
      } catch (error) {
        console.error("Error parsing product file:", error.message);
        ProductManager.#products = [];
      }
    } else {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    }
  }

  //METODO CREADOR CON VALIDACIONES//
  create(data) {
    try {
      if (
        !data.title ||
        typeof data.title !== "string" ||
        !data.photo ||
        typeof data.photo !== "string" ||
        !data.price ||
        !data.stock
      ) {
        throw new Error(
          "The values of title, photo, price and stock are required."
        );
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo: data.photo,
          price: parseInt(data.price),
          stock: parseInt(data.stock),
        };
        ProductManager.#products.push(product);
        const dataProduct = JSON.stringify(ProductManager.#products, null, 2);
        fs.writeFileSync(this.path, dataProduct);
      }
    } catch (error) {
      return error.message;
    }
  }

  //METODO PARA LEER TODOS LOS ARCHIVOS CON VALIDACIONES//
  read() {
    return fs.promises
      .readFile(this.path, settings)
      .then((res) => JSON.parse(res))
      .catch((error) => {
        return error.message;
      });
  }

  //METODO PARA LEER UN ARCHIVO POR ID CON VALIDACIONES//
  readOne(id) {
    return fs.promises
      .readFile(this.path, settings)
      .then((res) => {
        const data = JSON.parse(res);
        const productById = data.find((product) => product.id === id);
        if (!productById) {
          throw new Error("No matches were found with the entered ID");
        } else {
          return productById;
        }
      })
      .catch((error) => {
        return error.message;
      });
  }

  //METODO PARA ELIMINAR UN ARCHIVO POR ID CON VALIDACIONES//
  async destroy(id) {
    try {
      const oneProduct = ProductManager.#products.find(
        (user) => user.id === id
      );
      if (oneProduct) {
        ProductManager.#products = ProductManager.#products.filter(
          (user) => user.id !== id
        );

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#products, null, 2)
        );

        console.log("Deleted product with ID: " + id);
        return oneProduct.id;
      } else {
        throw new Error("There isn't a product with ID: " + id);
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const products = new ProductManager("./server/data/fs/files/products.Fs.json");

export default products;

// products.create({
//   title: "Keyboard",
//   photo: "./desktop/photos/keyboard.png",
//   price: 14000,
//   stock: 400,
// });

// products.create({
//   title: "TV",
//   photo: "./desktop/photos/tv.png",
//   price: 11000,
//   stock: 30,
// });

// products.read();
// products.readOne(2);

// products.destroy("dc8d91ee784379977f909b9f");
