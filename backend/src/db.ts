import * as mysql from "mysql";

export class DB {
  public connection!: mysql.Connection;

  public async init() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT as string),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    return new Promise<void>((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) {
          console.log(err);
          process.exit(1);
        }

        console.log("Connected to mysql database");
        resolve();
      })
    })
  }

  public async query(sql: string, values: any[]) {
    return new Promise<{ err: mysql.MysqlError | null, result: any }>((resolve, reject) => {
      this.connection.query(sql, values, (err, result) => {
        resolve({ err, result });
      });
    })
  }
}

export const db = new DB();