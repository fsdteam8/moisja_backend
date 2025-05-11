import express from "express";
import { createNewsletterSubscription, getAllNewsletterSubscription } from "./newsletterSubscription.controller.js";
import { adminMiddleware, verifyToken } from "../../core/middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", createNewsletterSubscription);
router.get("/get-all-newsletter-subscriptions", verifyToken, adminMiddleware, getAllNewsletterSubscription);

export default router;