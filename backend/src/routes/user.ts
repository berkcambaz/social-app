import * as express from "express";
import controller from "../controllers/user";

const router = express.Router();

router.post("/followUser", controller.followUser);
router.post("/getUserById", controller.getUserById);
router.post("/getUserByTag", controller.getUserByTag);

export default router;