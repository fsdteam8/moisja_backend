import { cloudinaryUpload } from "../../lib/cloudinaryUpload.js";
import Service from "./services.model.js";



export const createService = async (serviceData, adminId, files) => {
  try {
    const uploadedPhotos = [];

    if (files && files.photos && files.photos.length > 0) {
      for (const photo of files.photos) {
        const sanitizedTitle = serviceData.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[?&=]/g, "");

        const result = await cloudinaryUpload(photo.path, sanitizedTitle, "services");

        if (typeof result === "string" || !result?.secure_url) {
          throw new Error("Cloudinary upload failed");
        }

        uploadedPhotos.push(result.secure_url);
      }
    }

    const service = new Service({
      ...serviceData,
      photos: uploadedPhotos,
      adminId,
    });

    console.log(serviceData, adminId);
    await service.save();
    return service;
  } catch (error) {
    console.log(error);
    if (error.name === 'ValidationError') {
      const errorMessage = Object.values(error.errors).map(err => err.message).join(', ');
      const err = new Error(errorMessage);
      err.status = 400;
      throw err;
    }
    throw error;
  }
};

export const getAllServices = async (filters = {}, skip = 0, limit = 8) => {
  try {
    const query = { isActive: true };

    // Apply filters
    if (filters.category) {
      query.category = filters.category;
    }
    if (filters.adminId) {
      query.adminId = filters.adminId;
    }
    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { suburbs: { $regex: filters.search, $options: 'i' } }
      ];
    }

    // Fetch services with pagination
    const [services, totalData] = await Promise.all([
      Service.find(query)
        .skip(skip)
        .limit(limit)
        .populate('adminId', 'fullName email')
        .sort({ createdAt: -1 }),
      Service.countDocuments(query)
    ]);

    return [services, totalData];
  } catch (error) {
    const err = new Error('Failed to fetch services');
    err.status = 500;
    throw err;
  }
};


export const getServiceById = async (serviceId) => {
  try {
    const service = await Service.findOne({ _id: serviceId, isActive: true })
      .populate('adminId', 'fullName email');

    if (!service) {
      const error = new Error('Service not found');
      error.status = 404;
      throw error;
    }
    return service;
  } catch (error) {
    if (error.status) throw error;
    const err = new Error('Failed to fetch service');
    err.status = 500;
    throw err;
  }
};

export const updateService = async (serviceId, updateData, adminId, adminRole, files) => {
  try {
    const uploadedPhotos = [];

    if (files && files.photos && files.photos.length > 0) {
      for (const photo of files.photos) {
        const sanitizedTitle = (updateData.name || "service")
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[?&=]/g, "");

        const result = await cloudinaryUpload(photo.path, sanitizedTitle, "services");

        if (typeof result === "string" || !result?.secure_url) {
          throw new Error("Cloudinary upload failed");
        }

        uploadedPhotos.push(result.secure_url);
      }
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      const error = new Error('Service not found');
      error.status = 404;
      throw error;
    }

    if (service.adminId.toString() !== adminId.toString() && adminRole !== 'SUPER_ADMIN') {
      const error = new Error('Not authorized to update this service');
      error.status = 403;
      throw error;
    }

    // Only update allowed fields
    const allowedUpdates = ['name', 'description', 'price', 'duration', 'category', 'isActive', 'suburbs'];
    const updates = Object.keys(updateData)
      .filter(key => allowedUpdates.includes(key))
      .reduce((obj, key) => {
        obj[key] = updateData[key];
        return obj;
      }, {});

    // Add photos if any new ones were uploaded
    if (uploadedPhotos.length > 0) {
      updates.photos = uploadedPhotos;
    }

    Object.assign(service, updates);
    if (updateData.suburbs) {
      const newSuburbs = Array.isArray(updateData.suburbs)
        ? updateData.suburbs
        : [updateData.suburbs];
      service.suburbs = Array.from(new Set([...service.suburbs, ...newSuburbs]));
    }

    await service.save();
    return service;
  } catch (error) {
    if (error.status) throw error;
    if (error.name === 'ValidationError') {
      const errorMessage = Object.values(error.errors).map(err => err.message).join(', ');
      const err = new Error(errorMessage);
      err.status = 400;
      throw err;
    }
    const err = new Error('Failed to update service');
    err.status = 500;
    throw err;
  }
};


export const deleteService = async (serviceId, adminId, adminRole) => {
  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      const error = new Error('Service not found');
      error.status = 404;
      throw error;
    }

    if (service.adminId.toString() !== adminId.toString() && adminRole !== 'ADMIN') {
      const error = new Error('Not authorized to delete this service');
      error.status = 403;
      throw error;
    }

    // Soft delete by setting isActive to false
    service.isActive = false;
    await service.save();

    return { message: 'Service deleted successfully' };
  } catch (error) {
    if (error.status) throw error;
    const err = new Error('Failed to delete service');
    err.status = 500;
    throw err;
  }
};
