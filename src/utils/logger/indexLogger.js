// import argsUtils from "../utils/args.utils.js";

const persistence = process.env.MODE || "prod";

let logger;

switch (persistence) {
  case "prod":
    const { default: winstonProd } = await import("./winston.utils.js");
    logger = winstonProd;
    break;
  default:
    const { default: winstonDev } = await import("./winston.dev.utils.js");
    logger = winstonDev;
    break;
}

export default logger;
