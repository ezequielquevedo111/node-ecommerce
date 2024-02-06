import "dotenv/config.js";
import dbConnection from "./src/utils/db.js";
import express from "express";
import { createServer } from "http";
import router from "./src/routers/index.router.js";
import { engine } from "express-handlebars";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import __dirname from "./utils.js";
import morgan from "morgan";
// import socketUtil from "./src/utils/socket.util.js";

// Creación server //
const server = express();
const httpServer = createServer(server);

const PORT = 8080;
const ready = () => {
  console.log("server ready on PORT: " + PORT);
  dbConnection();
};

// server.listen(PORT, ready);
httpServer.listen(PORT, ready);

//Templates - Views//
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//Middlewares//
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(morgan("dev"));

//Endpoints
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
