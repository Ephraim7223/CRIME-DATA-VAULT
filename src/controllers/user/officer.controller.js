import Criminal from '../../models/criminal/criminal.models.js';
import Visitor from '../../models/visitor/visitor.model.js';
import PendingUpdateRequest from '../../models/pending/pending.model.js';

export const getAllCriminals = async (req, res) => {
  try {
    const allCriminals = await Criminal.find();
    return res.status(200).json(allCriminals);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getSingleCriminal = async (req, res) => {
  try {
    const singleCriminal = await Criminal.findById(req.params.criminalId);
    if (!singleCriminal) {
      return res.status(404).json({ message: 'Criminal not found' });
    }
    return res.json(singleCriminal);
  } catch (error) {
    console.error('Error fetching single criminal:', error);
    return res.status(500).json({ message: 'An error occurred while fetching criminal' });
  }
};

export const getAllVisitors = async (req, res) => {
  try {
    const allVisitors = await Visitor.find().populate('criminal', 'ID name firstname lastname');
    return res.json(allVisitors);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getSingleVisitor = async (req, res) => {
  try {
    const singleVisitor = await Visitor.findById(req.params.visitorId).populate(
      'criminal',
      'ID name firstname lastname'
    );
    if (!singleVisitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }
    return res.json(singleVisitor);
  } catch (error) {
    console.error('Error fetching single visitor:', error);
    return res.status(500).json({ message: 'An error occurred while fetching visitor' });
  }
};

export const submitUpdateRequest = async (req, res) => {
  try {
    const criminal = await Criminal.findById(req.params.criminalId);
    if (!criminal) {
      return res.status(404).json({
        success: false,
        message: 'Criminal not found!',
      });
    }

    const officerId = req.auth.sub;
    const allowedFields = [
      'firstname',
      'lastname',
      'gender',
      'DOB',
      'crime',
      'dateCommitted',
      'reportedBy',
      'LGA',
    ];
    const dataToUpdate = {};
    const fieldsToUpdate = [];

    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        dataToUpdate[field] = req.body[field];
        fieldsToUpdate.push(field);
      }
    }

    if (fieldsToUpdate.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No allowed fields provided for update.',
      });
    }

    const updateRequest = new PendingUpdateRequest({
      officerId,
      criminalId: criminal._id,
      originalData: criminal.toObject(),
      dataToUpdate,
      fieldsToUpdate,
      comments: req.body.comments ?? '',
      adminDecision: 'pending',
      isApproved: false,
    });

    criminal.updatePending = true;
    await updateRequest.save();
    await criminal.save();

    return res.status(200).json({
      success: true,
      message: 'Update request submitted!',
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
