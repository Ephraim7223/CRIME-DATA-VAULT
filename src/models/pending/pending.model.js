import mongoose from 'mongoose';

const updateRequestSchema = new mongoose.Schema(
  {
    officerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Officer',
      required: true,
    },
    criminalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Criminal',
      required: true,
    },
    originalData: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    dataToUpdate: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    fieldsToUpdate: {
      type: [String],
      required: true,
    },
    comments: { type: String, required: true, default: '' },
    isApproved: { type: Boolean, default: false },
    adminComments: { type: String },
    adminDecision: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const PendingUpdateRequest = mongoose.model('PendingUpdateRequest', updateRequestSchema);
export default PendingUpdateRequest;
