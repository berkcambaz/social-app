import { FastifyInstance } from "fastify";
import controller from "../controllers/post";

async function router(server: FastifyInstance) {
  server.post("/deletePost", controller.deletePost);
  server.post("/likePost", controller.likePost);
  server.post("/bookmarkPost", controller.bookmarkPost);
  server.post("/postPost", controller.postPost);
  server.post("/getFeedPosts", controller.getFeedPosts);
  server.post("/getUserPosts", controller.getUserPosts);
  server.post("/getBookmarkedPosts", controller.getBookmarkedPosts);
}

export default router;