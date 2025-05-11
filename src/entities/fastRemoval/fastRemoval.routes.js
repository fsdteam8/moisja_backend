import express from 'express'
import { userAdminSellerMiddleware } from '../../core/middlewares/authMiddleware.js';
import { createFastRemovalRequest, deleteFastRemovalRequest, fastRemovalStatController, getAllFastRemovalRequests, getFastRemovalRequestById, getFastRemovalRequestByUserId, updateFastRemovalRequest } from './fastRemoval.controller.js';



const router = express.Router();

router.use(userAdminSellerMiddleware)
router.post('/create',createFastRemovalRequest)
router.get('/stats',fastRemovalStatController)
router.get('/',getAllFastRemovalRequests)
router.get('/user/:userId',getFastRemovalRequestByUserId)
router.get('/:id',getFastRemovalRequestById)
router.put('/:id',updateFastRemovalRequest)
router.delete('/:id',deleteFastRemovalRequest)


export default router