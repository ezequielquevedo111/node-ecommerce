import express from "express";
import router from "./src/routers/index.router.js";
import { engine } from "express-handlebars";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import __dirname from "./utils.js";
import morgan from "morgan";

// Creación server //
const server = express();

const PORT = 8080;
const ready = () => console.log("server ready on PORT: " + PORT);

//Templates//
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//Middlewares//
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));

server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);

server.listen(PORT, ready);
