class ProductManager {
  static #products = [];
  constructor() {}
  //METODO CREADOR//
  create(data) {
    const product = {
      id:
        ProductManager.#products.length === 0
          ? 1
          : ProductManager.#products[ProductManager.#products.length - 1].id +
            1,
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