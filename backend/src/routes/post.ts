import * as express from "express";
import controller from "../controllers/post";

const router = express.Router();

router.post("/getFeedPosts", controller.getFeedPosts);
router.post("/getUserPosts", controller.getUserPosts);

export default router;