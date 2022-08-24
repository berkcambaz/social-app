import { config } from "dotenv";

import * as express from "express";
import * as cookieParser from "cookie-parser";

import * as path from "path";

import { api } from "./api";

async function main() {
  config();
  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use("/", express.static(path.join(__dirname, "../../frontend/dist")));

  app.post("/api", (req, res) => { api(req, res) })

  const port = (process.env.PORT !== undefined && parseInt(process.env.PORT)) || 80;
  app.listen(port, () => { console.log(`Server has started on port ${port}`) })
}

main();