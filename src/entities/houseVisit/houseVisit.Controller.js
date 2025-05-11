// controllers/houseVisitController.js
import { generateResponse } from '../../lib/responseFormate.js';
import HouseVisit from './houseVisit.model.js';
import * as houseVisitService from './houseVisit.service.js';

export const createHouseVisitController = async (req, res) => {
  try {
    const newVisit = await houseVisitService.requestHouseVisit(req.body, req.user._id);
    generateResponse(res, 201, true, 'House visit request created successfully', newVisit);
  } catch (error) {
    generateResponse(res, 500, false, error.message);
  }
};

export const getAllHouseVisitsController = async (req, res) => {
  try {
    const visits = await houseVisitService.getAllHouseVisits(req.body)
    generateResponse(res, 200, true, 'House visits fetched successfully', visits);
  } catch (error) {
    generateResponse(res, 500, false, error.message);
  }
};

export const getHouseVisitByIdController = async (req, res) => {
  try {
    const visit = await houseVisitService. getHouseVisitById(req.params.id);
    if (!visit) {
      return res.status(404).json({ message: 'House visit not found' });
    }
    generateResponse(res, 200, true, 'House visit fetched successfully', visit);
  } catch (error) {
    generateResponse(res, 500, false, error.message);
  }
};
export const getHouseVisitRequestByUserIdController = async (req, res, next) => {
  try {
      const houseVisit = await houseVisitService.houseVisitRequestByUserIdService(req.user._id);
      if (!houseVisit) {
          return generateResponse(res, 404, false, 'Removal request not found', null);
      }
      generateResponse(res, 200, true, 'Removal request fetched successfully', houseVisit);
  } catch (error) {
      next(error);
  }
}

export const updateHouseVisitController = async (req, res) => {
  try {
    const updatedVisit = await houseVisitService. updateHouseVisit(req.params.id, req.body);
    if (!updatedVisit) {
      return res.status(404).json({ message: 'House visit not found' });
    }
    generateResponse(res, 200, true, 'House visit updated successfully', updatedVisit);
  } catch (error) {
  generateResponse(res, 500, false, error.message);
  }
};

export const deleteHouseVisitController = async (req, res) => {
  try {
    const deleted = await houseVisitService. deleteHouseVisit(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'House visit not found' });
    }
    generateResponse(res, 200, true, 'House visit deleted successfully', deleted);
  } catch (error) {
    generateResponse(res, 500, false, error.message);
  }
};

export const houseVisitStatController = async(req,res) =>{
  try{
      const monthlyStats= await HouseVisit.aggregate(
          [
              {
                  $group:{
                      _id:{
                          month: { $month: { $toDate: '$createdAt' } },
                          year: { $year: { $toDate: '$createdAt' } },
                          status:'$status'
                      },
                      count:{$sum: 1}
                  }

              },
              {
                  $project: {
                    year: '$_id.year',
                    month: {
                      $switch: {
                        branches: [
                          { case: { $eq: ['$_id.month', 1] }, then: 'January' },
                          { case: { $eq: ['$_id.month', 2] }, then: 'February' },
                          { case: { $eq: ['$_id.month', 3] }, then: 'March' },
                          { case: { $eq: ['$_id.month', 4] }, then: 'April' },
                          { case: { $eq: ['$_id.month', 5] }, then: 'May' },
                          { case: { $eq: ['$_id.month', 6] }, then: 'June' },
                          { case: { $eq: ['$_id.month', 7] }, then: 'July' },
                          { case: { $eq: ['$_id.month', 8] }, then: 'August' },
                          { case: { $eq: ['$_id.month', 9] }, then: 'September' },
                          { case: { $eq: ['$_id.month', 10] }, then: 'October' },
                          { case: { $eq: ['$_id.month', 11] }, then: 'November' },
                          { case: { $eq: ['$_id.month', 12] }, then: 'December' },
                        ],
                        default: 'Unknown'
                      }
                    },
                    status: '$_id.status',
                    count: 1  
                  }
                },
                {
                  $sort: {
                    year: 1,
                    month: 1
                  }
                }
          ]
      )

      // get over all stats for all 
      const overallStats = await HouseVisit.aggregate([
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 }
            }
          }
        ]);
        generateResponse(res, 200, true, 'House visit statistics fetched successfully', {
          monthlyStats,
          overallStats
        });
        
  }catch(error){
      console.error(error)
      generateResponse(res,500,false,error.message)
  }
} 