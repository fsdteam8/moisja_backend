import HouseVisit from "./houseVisit.model.js";

export const requestHouseVisit = async (data, userId) => {
  const houseVisit = new HouseVisit({
    ...data,
    userId: userId,
    status: 'requested'
  });
  return await houseVisit.save();
};

export const getAllHouseVisits = async () => {
  return await HouseVisit.find()
  .populate('userId', 'firstName lastName email');
};

export const getHouseVisitById = async (id) => {
  return await HouseVisit.findById(id)
  .populate('userId', 'firstName lastName email');
};

export const updateHouseVisit = async (id, updateData) => {
  return await HouseVisit.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteHouseVisit = async (id) => {
  return await HouseVisit.findByIdAndDelete(id);
};
export const houseVisitRequestByUserIdService = async (userId) => {
  const houseVisit = await HouseVisit.find({ userId: userId })
  .populate('userId', 'firstName lastName email');
  return houseVisit;
}