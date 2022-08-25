import "dotenv/config";

import * as express from "express";
import * as cookieParser from "cookie-parser";

import * as path from "path";

import { db } from "./db";

import auth from "./controllers/auth";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import postRoutes from "./routes/post";

async function main() {
  await db.init();

  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use("/", express.static(path.join(__dirname, "../../frontend/dist")));

  // Authorization
  app.use(async (req, res, next) => {
    const userId = await auth.auth(req, res, next);
    res.locals.userId = userId;
    next();
  });

  // Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/post", postRoutes);

  const port = (process.env.PORT !== undefined && parseInt(process.env.PORT)) || 80;
  app.listen(port, () => { console.log(`Server has started on port ${port}`) })
}

main();