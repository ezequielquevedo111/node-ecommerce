// import "dotenv/config.js";
import env from "./src/utils/envt.utils.js";
// import dbConnection from "./src/utils/db.js";
import express from "express";
import { createServer } from "http";
// import router from "./src/routers/index.router.js";
import argsUtils from "./src/utils/args.utils.js";
import IndexRouter from "./src/routers/index.router.js";
import { engine } from "express-handlebars";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import __dirname from "./utils.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import cors from "cors";
// import sessionFileStore  from "session-file-store";
import MongoStore from "connect-mongo";
import compression from "express-compression";

// Creación server //
const server = express();
const httpServer = createServer(server);

const PORT = process.env.PORT || 8080;

const ready = () => {
  console.log("server ready on PORT: " + PORT);
  // dbConnection();
};

// server.listen(PORT, ready);
httpServer.listen(PORT, ready);

//Templates - Views//
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//Middlewares//
server.use(cookieParser());
//MEMORY STORAGE
// server.use(
//   expressSession({
//     secret: "process.env.SECRET_SESSION",
//     resave: true,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 },
//   })
// );

//FILE STORAGE
// const FileStore = sessionFileStore(expressSession);

// server.use(
//   expressSession({
//     secret: "process.env.SECRET_SESSION",
//     resave: true,
//     saveUninitialized: true,
//     store: new FileStore({
//       path: "./src/data/fs/files/sessions/",
//       ttl: 10,
//       retries: 2,
//     }),
//   })
// );

//MONGO STORAGE
server.use(
  cors({
    origin: true,
    credentials: true,
  })
);

server.use(
  expressSession({
    secret: "process.env.SECRET_SESSION",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: env.DB_ENV_LINK,
      ttl: 7 * 24 * 60 * 60,
    }),
  })
);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(morgan("dev"));
// server.use(compression());
server.use(compression({ brotli: { enabled: true, zlib: {} } }));

//Endpoints
const router = new IndexRouter();
server.use("/", router.getRouter());
server.use(errorHandler);
server.use(pathHandler);
