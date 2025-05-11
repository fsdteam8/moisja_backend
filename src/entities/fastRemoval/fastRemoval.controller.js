
import { generateResponse } from "../../lib/responseFormate.js";
import FastRemoval from "./fastRemoval.model.js";
import { createFastRemovalRequestService, deleteFastRemovalRequestService, getAllFastRemovalRequestsService, getFastRemovalRequestByIdService, getFastRemovalRequestByUserIdService, updateFastRemovalRequestService } from "./fastRemoval.service.js";

export  const createFastRemovalRequest = async (req, res) => {
    try {
        const data = await createFastRemovalRequestService (req.body,req.user._id);
        generateResponse(res, 201, true, 'Fast removal request created successfully', data);
    }
    catch (error) {
        generateResponse(res, 500, false, error.message);
    }
}
export const getAllFastRemovalRequests = async (req, res) => {
    try {
        const data = await getAllFastRemovalRequestsService(req.body);
        generateResponse(res, 200, true, 'Fast removal requests fetched successfully', data);
    } catch (error) {
        generateResponse(res, 500, false, error.message);
    }
};
export const getFastRemovalRequestById = async (req, res) => {
    try {
        const data = await getFastRemovalRequestByIdService(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Fast removal request not found' });
        }
        generateResponse(res, 200, true, 'Fast removal request fetched successfully', data);
    } catch (error) {
        generateResponse(res, 500, false, error.message);
    }
}
export const updateFastRemovalRequest = async (req, res) => {
    try {
        const data = await updateFastRemovalRequestService(req.params.id, req.body);
        if (!data) {
            return res.status(404).json({ message: 'Fast removal request not found' });
        }
        generateResponse(res, 200, true, 'Fast removal request updated successfully', data);
    } catch (error) {
    generateResponse(res, 500, false, error.message);
    }
};
export const deleteFastRemovalRequest = async (req, res) => { 
    try {
        const data = await deleteFastRemovalRequestService(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Fast removal request not found' });
        }
        generateResponse(res, 200, true, 'Fast removal request deleted successfully', data);
    } catch (error) {
        generateResponse(res, 500, false, error.message);
    }
}
export const getFastRemovalRequestByUserId = async (req, res) => {
    try {
        const data = await getFastRemovalRequestByUserIdService(req.user._id);
        if (!data) {
            return res.status(404).json({ message: 'Fast removal request not found' });
        }
        generateResponse(res, 200, true, 'Fast removal request fetched successfully', data);
    } catch (error) {
        generateResponse(res, 500, false, error.message);
    }
}

export const fastRemovalStatController = async(req,res) =>{
    try{
        const monthlyStats= await FastRemoval.aggregate(
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
        const overallStats = await FastRemoval.aggregate([
            {
              $group: {
                _id: '$status',
                count: { $sum: 1 }
              }
            }
          ]);
          generateResponse(res, 200, true, 'Fast removal statistics fetched successfully', {
            monthlyStats,
            overallStats
          });
          
    }catch(error){
        console.error(error)
        generateResponse(res,500,false,error.message)
    }
} 