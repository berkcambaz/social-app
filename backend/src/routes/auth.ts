import { FastifyInstance } from "fastify";
import controller from "../controllers/auth";;

async function router(server: FastifyInstance) {
  server.post("/auth", controller.auth);
  server.post("/login", controller.login);
  server.post("/signup", controller.signup);
  server.post("/logout", controller.logout);
}

export default router