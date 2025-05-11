import FastRemovalRequest from "./fastRemoval.model.js";


export const createFastRemovalRequestService = async (body, userId) => {
    const fastRemovalRequest = new FastRemovalRequest({
        ...body,
        userId: userId
    })
    await fastRemovalRequest.save();
    return fastRemovalRequest;
}
export const getAllFastRemovalRequestsService = async () => {
    return await FastRemovalRequest.find()

        .populate('userId', 'firstName lastName email')
}
export const getFastRemovalRequestByIdService = async (id) => {
    return await FastRemovalRequest.findById(id)
        .populate('userId', 'firstName lastName email');
}
export const updateFastRemovalRequestService = async (id, updateData) => {
    return await FastRemovalRequest.findByIdAndUpdate(id, updateData, { new: true });
}
export const deleteFastRemovalRequestService = async (id) => {
    return await FastRemovalRequest.findByIdAndDelete(id);
}
export const getFastRemovalRequestByUserIdService = async (userId) => {
    return await FastRemovalRequest.find({ userId: userId })
        .populate('userId', 'firstName lastName email');
}