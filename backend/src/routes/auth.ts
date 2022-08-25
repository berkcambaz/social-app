import * as express from "express";
import controller from "../controllers/auth";

const router = express.Router();

router.get("/auth", controller.auth);
router.post("/login", controller.login);
router.post("/signup", controller.signup);
router.get("/logout", controller.logout);

export default router;