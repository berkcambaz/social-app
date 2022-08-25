import * as express from "express";
import controller from "../controllers/user";

const router = express.Router();

router.post("/getById", controller.getUserById);
router.post("/getByTag", controller.getUserByTag);

export default router;