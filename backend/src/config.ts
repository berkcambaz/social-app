import { config as dotenv } from "dotenv";

import * as path from "path";

dotenv({ path: path.join(__dirname, "../.env") });

const databaseHost = process.env.DB_HOST || "localhost";
const databaseName = process.env.DB_NAME || "chernolink";
const databasePort = (process.env.DB_PORT && parseInt(process.env.DB_PORT)) || 3306;
const databaseUser = process.env.DB_USER || "root";
const databasePassword = process.env.DB_PASSWORD || "";
const databaseConnectionLimit = (process.env.DB_CON_LIMIT && parseInt(process.env.DB_CON_LIMIT)) || 10;

const port = (process.env.PORT && parseInt(process.env.PORT)) || 80;

export const config = {
  databaseHost,
  databaseName,
  databasePort,
  databaseUser,
  databasePassword,
  databaseConnectionLimit,
  port,
}
