import PendingUpdateRequest from "../../models/pending/pending.model.js";
import Criminal from "../../models/criminal/criminal.models.js"; // Import the Criminal model

export const getPendingUpdateRequests = async (req, res) => {
  try {
    // Fetch all pending update requests from the database
    const pendingRequests = await PendingUpdateRequest.find({ isApproved: false });

    // Process the pending requests to include necessary fields from the original data
    const processedPendingRequests = await Promise.all(pendingRequests.map(async request => {
      const fieldsToUpdate = request.fieldsToUpdate;
      const officerId = request.officerId
      const criminalId = request.criminalId
      const originalData = await Criminal.findById(request.originalData.criminalId);

      // Create an object containing only the fields that need to be updated
      const dataToUpdate = {};
      fieldsToUpdate.forEach(field => {
        if (originalData && originalData.hasOwnProperty(field)) {
          dataToUpdate[field] = originalData[field];
        }
      });

      // Create a new object with the relevant information
      return {
        _id: request._id,
        officerId: officerId,
        criminalId: criminalId,
        originalData: request.originalData,
        fieldsToUpdate: fieldsToUpdate,
        dataToUpdate: dataToUpdate,
        comments: request.comments,
        // Add other necessary fields here
      };
    }));

    // Return the processed pending requests as the response
    res.status(200).json(processedPendingRequests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSinglePendingUpdateRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId;

    // Find the single pending update request by its ID
    const pendingRequest = await PendingUpdateRequest.findById(requestId);

    if (!pendingRequest) {
      return res.status(404).json({
        success: false,
        message: 'Pending update request not found!',
      });
    }

    // Process the pending request to include necessary fields from the original data
    const fieldsToUpdate = pendingRequest.fieldsToUpdate;
    const officerId = pendingRequest.officerId;
    const criminalId = pendingRequest.criminalId;
    const originalData = await Criminal.findById(pendingRequest.originalData.criminalId);

    // Create an object containing only the fields that need to be updated
    const dataToUpdate = {};
    fieldsToUpdate.forEach(field => {
      if (originalData && originalData.hasOwnProperty(field)) {
        dataToUpdate[field] = originalData[field];
      }
    });

    // Create an object with the relevant information
    const processedPendingRequest = {
      _id: pendingRequest._id,
      officerId: officerId,
      criminalId: criminalId,
      originalData: pendingRequest.originalData,
      fieldsToUpdate: fieldsToUpdate,
      dataToUpdate: dataToUpdate,
      comments: pendingRequest.comments,
      // Add other necessary fields here
    };

    // Return the processed pending request as the response
    res.status(200).json(processedPendingRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};