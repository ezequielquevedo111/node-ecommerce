import express from "express";
import router from "./src/routers/index.router.js";

// Creación server //
const server = express();

const PORT = 8080;
const ready = () => console.log("server ready on PORT: " + PORT);

//Middlewares//
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/", router);

server.listen(PORT, ready);
