import * as express from "express";
import * as cookieParser from "cookie-parser";
import * as staticCompressed from "express-static-gzip";

import * as path from "path";

import { db } from "./db";
import { config } from "./config";

import auth from "./controllers/auth";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import postRoutes from "./routes/post";

async function main() {
  db.init();

  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use("/", staticCompressed(path.join(__dirname, "../../frontend/dist"), { enableBrotli: true }));

  // Authorization
  app.use(async (req, res, next) => {
    const token = await auth.parseToken(res, auth.getToken(req));
    res.locals.userId = token === null ? undefined : token.userId;
    res.locals.tokenId = token === null ? undefined : token.tokenId;
    next();
  });

  // Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/post", postRoutes);

  // Catch all other routes and send index.html
  app.get("*", (_req, res, _next) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  })

  app.listen(config.port, () => { console.log(`Server has started on port ${config.port}`) })
}

main();