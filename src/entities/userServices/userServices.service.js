import RemovalRequest from '../removalRequest/removalRequest.model.js';
import HouseVisit from '../houseVisit/houseVisit.model.js';
import FastRemoval from '../fastRemoval/fastRemoval.model.js';

export const getAllUserServicesService = async (userId, page, skip, limit) => {
    const [removalRequests, houseVisits, fastRemovals] = await Promise.all([
        RemovalRequest.find({ userId }),
        HouseVisit.find({ userId }),
        FastRemoval.find({ userId }),
    ]);

    // Format each service type
    const formattedFastRemovals = fastRemovals.map(item => ({
        serviceName: 'Free & Fast Removal',
        status: item.status,
        date: item.createdAt,
        id: item._id,
    }));

    const formattedHouseVisits = houseVisits.map(item => ({
        serviceName: 'House Visit',
        status: item.status,
        date: item.createdAt,
        id: item._id,
    }));

    const formattedRemovalRequests = removalRequests.map(item => ({
        serviceName: 'Removal Request',
        status: item.status,
        date: item.createdAt,
        id: item._id,
    }));

    // Combine and sort by date (latest first)
    const mergedServices = [
        ...formattedFastRemovals,
        ...formattedHouseVisits,
        ...formattedRemovalRequests,
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return {
        data: mergedServices.slice(skip, skip + limit),
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(mergedServices.length / limit),
            totalItems: mergedServices.length,
            itemsPerPage: limit
        },
    };
}