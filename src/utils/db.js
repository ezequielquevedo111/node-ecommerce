import { connect } from "mongoose";
import winston from "./logger/winston.utils.js";

const dbConnection = async () => {
  try {
    await connect(process.env.DB_ENV_LINK);
    winston.INFO("database connected");
  } catch (error) {
    winston.ERROR(error);
  }
};

export default dbConnection;
