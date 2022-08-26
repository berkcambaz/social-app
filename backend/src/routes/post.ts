import * as express from "express";
import controller from "../controllers/post";

const router = express.Router();

router.post("/deletePost", controller.deletePost);
router.post("/likePost", controller.likePost);
router.post("/bookmarkPost", controller.bookmarkPost);
router.post("/postPost", controller.postPost);
router.post("/getFeedPosts", controller.getFeedPosts);
router.post("/getUserPosts", controller.getUserPosts);

export default router;