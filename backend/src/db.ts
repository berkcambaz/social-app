import { config } from "./config";

import * as mysql from "mysql";

export class DB {
  public pool!: mysql.Pool;

  public init() {
    this.pool = mysql.createPool({
      host: config.databaseHost,
      port: config.databasePort,
      database: config.databaseName,
      user: config.databaseUser,
      password: config.databasePassword,

      multipleStatements: true,

      connectionLimit: config.databaseConnectionLimit,
      charset: "utf8mb4_unicode_ci"
    });
  }

  public async query(sql: string, values: any[]) {
    return new Promise<{ err: mysql.MysqlError | null, result: any }>((resolve, reject) => {
      this.pool.query(sql, values, (err, result) => {
        resolve({ err, result });
      });
    })
  }
}

export const db = new DB();