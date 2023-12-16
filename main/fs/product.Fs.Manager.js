//VALORES INICIALES//
const fs = require("fs");
const route = "./main/fs/data/products.Fs.json";
const settings = "utf-8";

//CLASE CON METODOS//
class ProductManager {
  static #products = [];
  constructor() {
    this.isExist();
  }

  //METODO PARA VALIDAR SI EXISTE EL ARCHIVO O NO//
  isExist() {
    const exist = fs.existsSync(route, settings);
    if (exist) {
      const readContent = fs.readFileSync(route, settings);
      ProductManager.#products = JSON.parse(readContent);
    } else {
      fs.writeFileSync(route, JSON.stringify([], null, 2));
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
          id:
            ProductManager.#products.length === 0
              ? 1
              : ProductManager.#products[ProductManager.#products.length - 1]
                  .id + 1,
          title: data.title,
          photo: data.photo,
          price: parseInt(data.price),
          stock: parseInt(data.stock),
        };
        ProductManager.#products.push(product);
        const dataProduct = JSON.stringify(ProductManager.#products, null, 2);
        fs.writeFileSync(route, dataProduct);
      }
    } catch (error) {
      return error.message;
    }
  }

  //METODO PARA LEER TODOS LOS ARCHIVOS CON VALIDACIONES//
  read() {
    return fs.promises
      .readFile(route, settings)
      .then((res) => console.log(JSON.parse(res)))
      .catch((error) => {
        return error.message;
      });
  }

  //METODO PARA LEER UN ARCHIVO POR ID CON VALIDACIONES//
  readOne(id) {
    return fs.promises
      .readFile(route, settings)
      .then((res) => {
        const data = JSON.parse(res);
        const productById = data.find((product) => product.id === Number(id));
        if (!productById) {
          throw new Error("No matches were found with the entered ID");
        } else {
          return console.log(productById);
        }
      })
      .catch((error) => {
        return error.message;
      });
  }
}

const product = new ProductManager();

product.create({
  title: "Keyboard",
  photo: "./desktop/photos/keyboard.png",
  price: 14000,
  stock: 400,
});

product.create({
  title: "TV",
  photo: "./desktop/photos/tv.png",
  price: 11000,
  stock: 30,
});

product.read();
product.readOne(2);
