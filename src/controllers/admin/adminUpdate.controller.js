import PendingUpdateRequest from '../../models/pending/pending.model.js';
import Criminal from '../../models/criminal/criminal.models.js';

const updateCriminalData = async (criminal, fieldsToUpdate, newData) => {
  for (const field of fieldsToUpdate) {
    if (newData.hasOwnProperty(field)) {
      criminal[field] = newData[field];
    }
  }
  await criminal.save();
};

export const approveUpdateRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const updateRequest = await PendingUpdateRequest.findById(requestId);

    if (!updateRequest) {
      return res.status(404).json({
        success: false,
        message: 'Update request not found!',
      });
    }

    const updatedFields = updateRequest.fieldsToUpdate;

    const criminal = await Criminal.findById(updateRequest.originalData.criminalId);

    if (!criminal) {
      return res.status(404).json({
        success: false,
        message: 'Criminal data not found!',
      });
    }

    await updateCriminalData(criminal, updatedFields, updateRequest.dataToUpdate);

    // Update the approval status
    updateRequest.isApproved = true; // or false for rejection
    // Add adminComments if needed
    updateRequest.adminComments = req.body.adminComments;

    // Set the admin decision to 'approved'
    updateRequest.adminDecision = 'approved';

    // Save the updated updateRequest
    await updateRequest.save();

    res.status(200).json({
      success: true,
      message: 'Update request approved and corresponding data updated!',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const rejectUpdateRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const updateRequest = await PendingUpdateRequest.findById(requestId);

    if (!updateRequest) {
      return res.status(404).json({
        success: false,
        message: 'Update request not found!',
      });
    }

    // Set the admin decision to 'rejected'
    updateRequest.adminDecision = 'rejected';
    await updateRequest.save();

    res.status(200).json({
      success: true,
      message: 'Update request rejected!',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
