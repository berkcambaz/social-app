"use strict";
exports.__esModule = true;
exports.config = void 0;
var dotenv_1 = require("dotenv");
var path = require("path");
(0, dotenv_1.config)({ path: path.join(__dirname, "../.env") });
var databaseHost = process.env.DB_HOST || "localhost";
var databaseName = process.env.DB_NAME || "chernolink";
var databasePort = (process.env.DB_PORT && parseInt(process.env.DB_PORT)) || 3306;
var databaseUser = process.env.DB_USER || "root";
var databasePassword = process.env.DB_PASSWORD || "";
var databaseConnectionLimit = (process.env.DB_CON_LIMIT && parseInt(process.env.DB_CON_LIMIT)) || 10;
var port = (process.env.PORT && parseInt(process.env.PORT)) || undefined;
var development = !process.env.NODE_ENV || process.env.NODE_ENV === "development";
var production = !development;
exports.config = {
    databaseHost: databaseHost,
    databaseName: databaseName,
    databasePort: databasePort,
    databaseUser: databaseUser,
    databasePassword: databasePassword,
    databaseConnectionLimit: databaseConnectionLimit,
    port: port,
    development: development,
    production: production
};
