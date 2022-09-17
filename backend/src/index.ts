import { fastify, FastifyInstance } from "fastify";
import { fastifyCookie } from "@fastify/cookie";
import { fastifyStatic } from "@fastify/static";

import * as path from "path";

import { db } from "./db";

import auth from "./controllers/auth";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import postRoutes from "./routes/post";
import { config } from "./config";

db.init();

export const server: FastifyInstance = config.production ?
  fastify({ http2: true, https: { allowHTTP1: true } }) as unknown as FastifyInstance :
  fastify() as FastifyInstance;

server.register(fastifyCookie, { hook: "preHandler" });
server.register(fastifyStatic, {
  root: path.join(__dirname, "../../frontend/dist"),
  preCompressed: true
})

server.setNotFoundHandler((_req, res) => { res.sendFile("index.html") })

server.addHook("preHandler", async (req, res, next) => {
  res.locals = Object.create(null);
  const token = await auth.parseToken(res, auth.getToken(req));
  res.locals.userId = token === null ? undefined : token.userId;
  res.locals.tokenId = token === null ? undefined : token.tokenId;
  next();
})

// Routes
server.register(authRoutes, { prefix: "api/auth" });
server.register(userRoutes, { prefix: "api/user" });
server.register(postRoutes, { prefix: "api/post" });

server.listen({ host: "0.0.0.0", port: config.port }, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log(`Server has started on ${address}`);
})
