//Validas si el doc pasado por parametro no es undefined//
const notFoundDoc = (doc) => {
  if (!doc) {
    console.log(doc);
    const error = new Error("The document does not exist");
    error.statusCode = 404;
    throw error;
  }
  return doc;
};

export default notFoundDoc;
