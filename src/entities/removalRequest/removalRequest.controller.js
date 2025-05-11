import { generateResponse } from "../../lib/responseFormate.js";
import RemovalRequest from "./removalRequest.model.js";
import { createRemovalRequestService, deleteRemovalRequestService, getAllRemovalRequestsService, getRemovalRequestByIdService, getRemovalRequestByUserIdService, updateRemovalRequestService } from "./removalRequest.service.js";

export const createRemovalRequest = async (req, res, next) => {
    const { _id: userId } = req.user
    req.body.userId = userId;
    try {
        await createRemovalRequestService(req.body);
        generateResponse(res, 201, true, 'Removal request created successfully', null);
    }

    catch (error) {
        next(error);
    }
};

export const getAllRemovalRequests = async (req, res, next) => {
    try {
        const removalRequests = await getAllRemovalRequestsService(req.body);
        if (!removalRequests) {
            return generateResponse(res, 404, false, 'No removal requests found', null);
        }
        generateResponse(res, 200, true, 'Removal requests fetched successfully', removalRequests);
    } catch (error) {
        next(error);
    }
}
export const getRemovalRequestById = async (req, res, next) => {
    try {
        const removalRequest = await getRemovalRequestByIdService(req.params.id);
        if (!removalRequest) {
            return generateResponse(res, 404, false, 'Removal request not found', null);
        }
        generateResponse(res, 200, true, 'Removal request fetched successfully', removalRequest);
    } catch (error) {
        next(error);
    }
}
export const updateRemovalRequest = async (req, res, next) => {
    try {
        const removalRequest = await updateRemovalRequestService(req.params.id, req.body);
        if (!removalRequest) {
            return generateResponse(res, 404, false, 'Removal request not found', null);
        }
        generateResponse(res, 200, true, 'Removal request updated successfully', removalRequest);
    } catch (error) {
        next(error);
    }
};
export const deleteRemovalRequest = async (req, res, next) => {
    try {
        const removalRequest = await deleteRemovalRequestService(req.params.id);
        if (!removalRequest) {
            return generateResponse(res, 404, false, 'Removal request not found', null);
        }
        generateResponse(res, 200, true, 'Removal request deleted successfully', removalRequest);
    } catch (error) {
        next(error);
    }
}
export const getRemovalRequestByUserId = async (req, res, next) => {
    try {
        const removalRequest = await getRemovalRequestByUserIdService(req.user._id);
        if (!removalRequest) {
            return generateResponse(res, 404, false, 'Removal request not found', null);
        }
        generateResponse(res, 200, true, 'Removal request fetched successfully', removalRequest);
    } catch (error) {
        next(error);
    }
}

export const removalRequestStatController = async(req,res) =>{
    try{
        const monthlyStats= await RemovalRequest.aggregate(
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
        const overallStats = await RemovalRequest.aggregate([
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