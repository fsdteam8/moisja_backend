import express from 'express';
import { createHouseVisitController, deleteHouseVisitController, getAllHouseVisitsController, getHouseVisitByIdController, getHouseVisitRequestByUserIdController, houseVisitStatController, updateHouseVisitController } from './houseVisit.Controller.js';
import { userAdminSellerMiddleware, userMiddleware} from '../../core/middlewares/authMiddleware.js';

const router = express.Router();

router.use(userAdminSellerMiddleware)
router.post('/create',createHouseVisitController)
router.get('/stats',houseVisitStatController)
router.get('/',getAllHouseVisitsController)
router.get('/:id',getHouseVisitByIdController)
router.get('/user/:userId',getHouseVisitRequestByUserIdController)
router.put('/:id',updateHouseVisitController)
router.delete('/:id',deleteHouseVisitController)

export default router;