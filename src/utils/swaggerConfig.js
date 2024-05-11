import __dirname from "../../utils.js";

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentation of FAZT API",
      description:
        "This document contains all the data you need to manage the APIs.",
    },
  },
  apis: [`${__dirname}/src/docs/*.yaml`],
};

export default swaggerOptions;
