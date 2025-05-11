import RemovalRequest from "./removalRequest.model.js";

export const createRemovalRequestService = async (body) => {
    const removalRequest = new RemovalRequest(body);

    await removalRequest.save();
    return;
}

export const getAllRemovalRequestsService = async () => {
    const removalRequests = await RemovalRequest.find()
    .populate('userId', 'firstName lastName email').sort({ createdAt: -1 });
    return removalRequests;
}
export const getRemovalRequestByIdService = async (id) => {
    const removalRequest = await RemovalRequest.findById(id)
    .populate('userId', 'firstName lastName email');
    return removalRequest;
}
export const updateRemovalRequestService = async (id, updateData) => {
    const removalRequest = await RemovalRequest.findByIdAndUpdate(id, updateData, { new: true });
    return removalRequest;
}
export const deleteRemovalRequestService = async (id) => {
    const removalRequest = await RemovalRequest.findByIdAndDelete(id);
    return removalRequest;
}
export const getRemovalRequestByUserIdService = async (userId) => {
    const removalRequest = await RemovalRequest.find({ userId: userId })
    .populate('userId', 'firstName lastName email');
    return removalRequest;
}