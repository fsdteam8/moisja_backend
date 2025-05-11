import { getAllUserServicesService } from "./userServices.service.js";

export const getAllUserServices = async (req, res, next) => {
    const userId = req.user._id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const { data, pagination } = await getAllUserServicesService(userId, page, skip, limit);
        return res.status(200).json({
            status: true,
            message: "User services fetched successfully",
            data,
            pagination
        });
    }

    catch (error) {
        next(error);
    }
}