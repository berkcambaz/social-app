import * as express from "express";
import controller from "../controllers/user";

const router = express.Router();

router.post("/getUserFollowers", controller.getUserFollowers);
router.post("/getUserFollowings", controller.getUserFollowings);
router.post("/followUser", controller.followUser);
router.post("/getUserById", controller.getUserById);
router.post("/getUserByTag", controller.getUserByTag);
router.post("/editUser", controller.editUser);

export default router;