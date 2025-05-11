import mongoose from 'mongoose';

const pickupInfoSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    city: { type: String, required: true, trim: true },
    suburb: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    postcode: { type: String, required: true, trim: true },
    movingDate: { type: String, required: true, trim: true },
    needPacking: { type: String, enum: ['yes', 'no'], required: true },
    needMoreServices: { type: String, default: '' }
  },
  { _id: false }
);

const deliveryInfoSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    city: { type: String, required: true, trim: true },
    suburb: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    postcode: { type: String, required: true, trim: true },
    movingDate: { type: String, required: true, trim: true },
    needUnPacking: { type: String, enum: ['yes', 'no'], required: true },
    needMoreServices: { type: String, default: '' }
  },
  { _id: false }
);

const selectedItemSchema = new mongoose.Schema(
  {
    room: { type: String, required: true },
    item: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 }
  },
  { _id: false }
);

const removalRequestSchema = new mongoose.Schema(
  {
    erviceName: { 
      type: String, 
      required: true, 
      default: 'Free details removal request'
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    pickupInfo: {
      type: pickupInfoSchema,
      required: true
    },

    deliveryInfo: {
      type: deliveryInfoSchema,
      required: true
    },

    selectedItems: {
      type: [selectedItemSchema],
      default: []
    },

    otherAccessories: { type: String, default: '' },

    status: {
      type: String,
      enum: ['pending', 'approved', 'in-progress', 'completed', 'cancelled'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

const RemovalRequest = mongoose.model('RemovalRequest', removalRequestSchema);
export default RemovalRequest;
