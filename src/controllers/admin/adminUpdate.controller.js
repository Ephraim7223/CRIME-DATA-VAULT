import PendingUpdateRequest from '../../models/pending/pending.model.js';
import Criminal from '../../models/criminal/criminal.models.js';

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

    // Apply the updates to the criminal's data
    const criminal = await Criminal.findById(updateRequest.originalData.criminalId);
    if (!criminal) {
      return res.status(404).json({
        success: false,
        message: 'Criminal data not found!',
      });
    }

    const newData = updateRequest.dataToUpdate;
    const updatedFields = [];

    for (const field in newData) {
      if (criminal[field] !== newData[field]) {
        // Validate the data before updating
        if (field === 'DOB' && !isValidDate(newData[field])) {
          return res.status(400).json({
            success: false,
            message: `Invalid date of birth: ${newData[field]}`,
          });
        }

        criminal[field] = newData[field];
        updatedFields.push(field);
      }
    }

    // Update the approval status
    updateRequest.isApproved = true;
    await updateRequest.save();
    await criminal.save();

    res.status(200).json({
      success: true,
      message: 'Update request approved and corresponding data updated!',
      updatedFields: updatedFields,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

function isValidDate(dateString) {
  return !isNaN(Date.parse(dateString));
}



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
