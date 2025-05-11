import express from 'express';




import { adminMiddleware, verifyToken } from '../../core/middlewares/authMiddleware.js';
import { createService, deleteService, getAllServices, getServiceById, updateService } from './admin.controller.js';
import { multerUpload } from '../../core/middlewares/multer.js';

const router = express.Router();




// Routes
router.post('/create', verifyToken, adminMiddleware, multerUpload([{ name: "photos", maxCount: 5 },]), createService);
router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.put('/:id', verifyToken, adminMiddleware, multerUpload([{ name: "photos", maxCount: 5 },]), updateService);
router.delete('/:id', verifyToken, adminMiddleware, deleteService);

export default router;
