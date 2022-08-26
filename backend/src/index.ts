//import { config } from "dotenv";

import * as express from "express";
import * as cookieParser from "cookie-parser";

import * as path from "path";

import { db } from "./db";

import auth from "./controllers/auth";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import postRoutes from "./routes/post";

async function main() {
  //config({ path: path.join(__dirname, "../.env") })
  await db.init();

  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  // Authorization
  app.use(async (req, res, next) => {
    const userId = await auth.parseToken(auth.getToken(req));
    res.locals.userId = userId === null ? undefined : userId;
    next();
  });

  // Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/post", postRoutes);

  // Catch all other routes and send index.html
  app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  })

  const port = (process.env.PORT !== undefined && parseInt(process.env.PORT)) || 80;
  app.listen(port, () => { console.log(`Server has started on port ${port}`) })
}

main();