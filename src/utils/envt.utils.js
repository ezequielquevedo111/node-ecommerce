import args from "./args.utils.js";
import { config } from "dotenv";

const { env } = args;

const path =
  env === "prod" ? "./.env.prod" : env === "dev" ? "./.env.dev" : "./.env.test";
config({ path });

export default {
  DB_ENV_LINK: process.env.DB_ENV_LINK,
  SECRET_SESSION: process.env.SECRET_SESSION,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  SECRET: process.env.SECRET,
};
