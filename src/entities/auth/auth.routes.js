import express from 'express';
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  forgetPassword,
  verifyCode,
  resetPassword,
  logoutUser,
  updatePassword,
  
} from './auth.controller.js';
import { userAdminSellerMiddleware } from '../../core/middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-access-token', refreshAccessToken);
router.post('/forget-password', forgetPassword);
router.post('/verify-code', verifyCode);
router.post('/reset-password', resetPassword);
router.post('/logout',userAdminSellerMiddleware, logoutUser);
router.put('/update-password/:id', updatePassword);
export default router;
