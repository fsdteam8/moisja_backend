import mongoose from 'mongoose';
import RoleType from '../../lib/types.js';


const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true,
      maxlength: [100, 'Service name cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [1, 'Duration must be at least 1 hour']
    },
    category: {
      type: String,
      enum: {
        values: ['moving', 'packing', 'cleaning', 'storage', 'other'],
        message: 'Invalid category'
      },
      default: 'other'
    },
    suburbs: {
      type: [String],
      required: true
    },
    photos: {
      type: [String],
      default: []
    },
    isActive: {
      type: Boolean,
      default: true
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Indexes
serviceSchema.index({ name: 1 });
serviceSchema.index({ category: 1 });
serviceSchema.index({ adminId: 1 });

serviceSchema.pre('save', async function (next) {
  try {
    const User = mongoose.model('User');
    const admin = await User.findById(this.adminId);

    if (!admin) {
      throw new Error('Admin user not found');
    }

    if (admin.role !== RoleType.ADMIN && admin.role !== RoleType.SUPER_ADMIN) {
      throw new Error('Only admins can create services');
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Service = mongoose.model('Service', serviceSchema);
export default Service;