import PendingUpdateRequest from '../../models/pending/pending.model.js';

export const getPendingUpdateRequests = async (req, res) => {
  try {
    const pendingRequests = await PendingUpdateRequest.find({
      adminDecision: 'pending',
    })
      .populate('officerId', 'name ID email')
      .populate('criminalId', 'ID name firstname lastname');

    const processedPendingRequests = pendingRequests.map((request) => {
      const fieldsDetail = [];
      const originalData = request.originalData;

      for (const field of request.fieldsToUpdate) {
        if (originalData && Object.prototype.hasOwnProperty.call(originalData, field)) {
          fieldsDetail.push({
            field,
            previousValue: originalData[field],
            newValue: request.dataToUpdate[field],
          });
        }
      }

      return {
        _id: request._id,
        officerId: request.officerId,
        criminalId: request.criminalId,
        originalData: request.originalData,
        dataToUpdate: request.dataToUpdate,
        fieldsToUpdate: request.fieldsToUpdate,
        fieldsDetail,
        comments: request.comments,
        adminDecision: request.adminDecision,
        createdAt: request.createdAt,
      };
    });

    return res.status(200).json(processedPendingRequests);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getSinglePendingUpdateRequest = async (req, res) => {
  try {
    const request = await PendingUpdateRequest.findById(req.params.requestId)
      .populate('officerId', 'name ID email')
      .populate('criminalId', 'ID name firstname lastname');

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Pending update request not found!',
      });
    }

    const fieldsDetail = [];

    for (const field of request.fieldsToUpdate) {
      if (
        request.originalData &&
        Object.prototype.hasOwnProperty.call(request.originalData, field)
      ) {
        fieldsDetail.push({
          field,
          previousValue: request.originalData[field],
          newValue: request.dataToUpdate[field],
        });
      }
    }

    return res.status(200).json({
      _id: request._id,
      officerId: request.officerId,
      criminalId: request.criminalId,
      originalData: request.originalData,
      dataToUpdate: request.dataToUpdate,
      fieldsToUpdate: request.fieldsToUpdate,
      fieldsDetail,
      comments: request.comments,
      adminDecision: request.adminDecision,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
