import * as express from "express";
import controller from "../controllers/post";

const router = express.Router();

router.post("/deletePost", controller.deletePost);
router.post("/likePost", controller.likePost);
router.post("/bookmarkPost", controller.bookmarkPost);
router.post("/postPost", controller.postPost);
router.post("/postPostComment", controller.postPostComment);
router.post("/getFeedPosts", controller.getFeedPosts);
router.post("/getUserPosts", controller.getUserPosts);
router.post("/getUserPosts", controller.getUserPosts);
router.post("/getBookmarkedPosts", controller.getBookmarkedPosts);
router.post("/getPost", controller.getPost);
router.post("/getPostComments", controller.getPostComments);

export default router;