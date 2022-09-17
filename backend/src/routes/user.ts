import { FastifyInstance } from "fastify";
import controller from "../controllers/user";

async function router(server: FastifyInstance) {
  server.post("/getUserFollowers", controller.getUserFollowers);
  server.post("/getUserFollowings", controller.getUserFollowings);
  server.post("/searchUser", controller.searchUser);
  server.post("/followUser", controller.followUser);
  server.post("/getUserById", controller.getUserById);
  server.post("/getUserByTag", controller.getUserByTag);
  server.post("/editUser", controller.editUser);
}

export default router;