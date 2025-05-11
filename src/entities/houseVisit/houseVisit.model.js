import mongoose from 'mongoose';

const houseVisitSchema = new mongoose.Schema(
  {
    erviceName: { 
      type: String, 
      required: true, 
      default: 'House Visit Request' // Hardcoding the value as 'Free Fast Removal'
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
      trim: true
    },
    currentAddress: {
      type: String,
      required: true,
      trim: true
    },
    movingAddress: {
      type: String,
      required: true,
      trim: true
    },
    movingType: {
      type: String,
      enum: ['local', 'international'],
      required: true
    },
    comments: {
      type: String,
      maxLength: 1000,
      trim: true
    },
    status: {
      type: String,
      enum: ['requested', 'not-visited', 'visited', 'cancelled','completed'],
      default: 'requested'
    },
  },
  { timestamps: true }
);

const HouseVisit = mongoose.model('HouseVisit', houseVisitSchema);

export default HouseVisit;
