import PendingUpdateRequest from '../../models/pending/pending.model.js';
import Criminal from '../../models/criminal/criminal.models.js';

function isValidDate(dateString) {
  return !Number.isNaN(Date.parse(dateString));
}

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

    if (updateRequest.adminDecision !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'This request has already been processed.',
      });
    }

    const criminal = await Criminal.findById(updateRequest.criminalId);

    if (!criminal) {
      return res.status(404).json({
        success: false,
        message: 'Criminal data not found!',
      });
    }

    const newData = updateRequest.dataToUpdate;
    const updatedFields = [];

    for (const field of Object.keys(newData)) {
      if (criminal[field] !== newData[field]) {
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

    criminal.updatePending = false;
    updateRequest.isApproved = true;
    updateRequest.adminDecision = 'approved';
    await updateRequest.save();
    await criminal.save();

    return res.status(200).json({
      success: true,
      message: 'Update request approved and corresponding data updated!',
      updatedFields,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
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

    const criminal = await Criminal.findById(updateRequest.criminalId);
    if (criminal) {
      criminal.updatePending = false;
      await criminal.save();
    }

    updateRequest.adminDecision = 'rejected';
    updateRequest.isApproved = false;
    await updateRequest.save();

    return res.status(200).json({
      success: true,
      message: 'Update request rejected!',
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
