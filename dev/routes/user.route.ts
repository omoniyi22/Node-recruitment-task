import express from "express";
import userController from "./../components/User";
import { LoginMiddleware } from "./../components/User/user.middleware";

const router = express.Router();
router.post("/login", LoginMiddleware, userController.login);

export default router;