//VALORES INICIALES//
import fs from "fs";
import crypto from "crypto";
import notFoundDoc from "../../utils/notFoundDoc.util.js";
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
  async create(data) {
    try {
      // const product = {
      //   _id: crypto.randomBytes(12).toString("hex"),
      //   title: data.title,
      //   photo: data.photo,
      //   price: parseInt(data.price) || 1000,
      //   stock: parseInt(data.stock) || 10,
      //   date: data.date || new Date(),
      // };
      ProductManager.#products.push(data);
      const dataProduct = JSON.stringify(ProductManager.#products, null, 2);
      await fs.promises.writeFile(this.path, dataProduct);
      return data;
    } catch (error) {
      throw error;
    }
  }

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
        if (filter && filter.title) {
          data = data.filter((product) =>
            product.title.toLowerCase().includes(filter.title.toLowerCase())
          );
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

  //METODO PARA LEER UN ARCHIVO POR ID CON VALIDACIONES//

  async readOne(id) {
    try {
      const res = await fs.promises.readFile(this.path, "utf8");
      const doc = JSON.parse(res);
      const product = doc.find((each) => each._id === id);
      // notFoundDoc(product);
      return product;
    } catch (error) {
      throw error;
    }
  }

  //METODO PARA ELIMINAR UN ARCHIVO POR ID CON VALIDACIONES//
  async destroy(id) {
    try {
      const oneProduct = await this.readOne(id);
      if (oneProduct) {
        ProductManager.#products = ProductManager.#products.filter(
          (product) => product._id !== id
        );

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#products, null, 2)
        );

        return oneProduct;
      }
    } catch (error) {
      throw error;
    }
  }

  //METODO PARA ACTUALIZAR ARCHIVO POR ID CON VALIDACIONES//
  async update(id, data) {
    try {
      const doc = await this.readOne(id);
      for (let each in data) {
        doc[each] = data[each];
      }
      const index = ProductManager.#products.findIndex(
        (product) => product._id === id
      );
      if (index !== -1) {
        ProductManager.#products[index] = doc;
      }
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(ProductManager.#products, null, 2)
      );

      return doc;
    } catch (error) {
      throw error;
    }
  }
}

const products = new ProductManager("./src/data/fs/files/products.Fs.json");
// products
//   .readOne("04ee4d5740ef75b864851b4b")
//   .then((res) => console.log(res))
//   .catch((error) => console.error(error));

// products
//   .update("3afec3f6f6eb5f60d21412a7", { title: "Redragon Yama" })
//   .then((res) => console.log(res))
//   .catch((error) => console.error(error));

export default products;
