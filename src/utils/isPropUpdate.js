//Validamos si se ingresaron propiedades a modificar en la order//
const isPropUpdate = (req) => {
  try {
    const data = {};

    if (req.body.quantity !== undefined) {
      data.quantity = req.body.quantity;
    }

    if (req.body.state !== undefined) {
      data.state = req.body.state;
    }

    // Si no se proporciona ni quantity ni state, devolver null
    if (Object.keys(data).length === 0) {
      const error = new Error(
        "We couldn't update the document, please enter a valid value"
      );
      error.statusCode = 404;
      throw error;
      // return null;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export default isPropUpdate;
