import express from "express";
import { getAllUserServices } from "./userServices.controller.js";
import { userMiddleware, verifyToken } from "../../core/middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get-all-user-services", verifyToken, userMiddleware, getAllUserServices);

export default router;