import mongoose from 'mongoose';

const FastRemovalSchema = new mongoose.Schema(
  {
    serviceName: { 
      type: String, 
      required: true, 
      default: 'Free Fast Removal' // Hardcoding the value as 'Free Fast Removal'
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
      match: /^[0-9]{7,15}$/
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/
    },
    currentCity: {
      type: String,
      required: true,
      trim: true
    },
    currentSuburbs: {
      type: String,
      required: true,
      trim: true
    },
    movingCity: {
      type: String,
      required: true,
      trim: true
    },
    movingSuburbs: {
      type: String,
      required: true,
      trim: true
    },
    houseSize: {
      type: String,
      enum: ['small', 'medium', 'big', 'apartment'],
      required: true
    },
    movingDate: {
      type: Date,
      required: true
    },
    needPacking: {
      type: String,
      enum: ['yes', 'no'],
      required: true
    },
    needPickupCleaning: {
      type: String,
      enum: ['yes', 'no'],
      required: true
    },
    needUnpacking: {
      type: String,
      enum: ['yes', 'no'],
      required: true
    },
    needDeliveryCleaning: {
      type: String,
      enum: ['yes', 'no'],
      required: true
    },
    needStorage: {
      type: String,
      enum: ['yes', 'no'],
      required: true
    },
    comments: {
      type: String,
      trim: true,
      maxLength: 1000
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'in-progress', 'completed', 'cancelled'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

const FastRemoval = mongoose.model('FreeFastRemoval', FastRemovalSchema);

export default FastRemoval;
