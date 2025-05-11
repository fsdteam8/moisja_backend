import express from 'express';
import { createRemovalRequest, deleteRemovalRequest, getAllRemovalRequests, getRemovalRequestById, getRemovalRequestByUserId, removalRequestStatController, updateRemovalRequest } from './removalRequest.controller.js';
import { adminMiddleware, userAdminSellerMiddleware, userMiddleware, verifyToken } from '../../core/middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', verifyToken, userMiddleware, createRemovalRequest);

router.get('/', getAllRemovalRequests)
router.get('/stats', removalRequestStatController)
router.get('/:id', getRemovalRequestById)
router.get('/user/:userId', userAdminSellerMiddleware, getRemovalRequestByUserId)
router.delete('/:id', userAdminSellerMiddleware, deleteRemovalRequest)
router.put('/:id', verifyToken, adminMiddleware, updateRemovalRequest)

export default router;
