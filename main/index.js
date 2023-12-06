//Array products//
const products = [];

//Agregar products//
const addProduct = (product) => {
  products.push(product);
};

//Buscar por id//
const searchById = (id) => {
  let productoFiltrado = products.find((product) => product.id === id);
  return productoFiltrado;
};

//Actualizar por id//

const updateById = (id) => {
  let actualizacion = products.filter(
    (product) => product.id === id,
    console.log("producto actualizado")
  );
};

// Remover por id//

const removeById = () => {
  let remover = products.map((product) => product.id === id, {});
};

addProduct({ id: 1, nombre: "televisor", precio: 2000 });
console.log(products);
