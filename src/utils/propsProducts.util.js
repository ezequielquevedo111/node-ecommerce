//Validamos que se haya ingresado los valores requeridos para crear el doc//
const propsProductsUtils = (data) => {
  const { title, photo, price, stock } = data;
  if (
    !title ||
    typeof title !== "string" ||
    !photo ||
    typeof photo !== "string" ||
    (price === undefined && typeof price !== "number") ||
    (stock === undefined && typeof stock !== "number")
  ) {
    const error = new Error(
      "The values of title, photo, price, and stock are required, and price and stock must be of type number."
    );
    error.statusCode = 400;
    throw error;
  }
};

export default propsProductsUtils;
