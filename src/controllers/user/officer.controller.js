import Criminal from "../../models/criminal/criminal.models.js";
import Visitor from "../../models/visitor/visitor.model.js"
import PendingUpdateRequest from "../../models/pending/pending.model.js";


export const getAllCriminals = async(req, res) => {
  try{
      const allCriminals = await Criminal.find();
      res.status(200).json(allCriminals);
    }catch (error){
      res.status(404).json({ message: error.message})   
    }
}

export const getSingleCriminal = async (req, res) => {
  try {

      const singleCriminal = await Criminal.findById(req.params.criminalId);
      if (!singleCriminal) {
          return res.status(404).json({ message: "Criminal not found" });
      }
      res.json(singleCriminal);
  } catch (error) {
      console.error("Error fetching single criminal:", error);
      res.status(500).json({ message: "An error occurred while fetching criminal" });
  }
};

export const getAllVisitors = async(req, res) => {
  try{
    const allVisitors = await Visitor.find();
    if (!allVisitors) {
      return res.status(404).json({ messages: "No visitor found in database"});
    }
    res.json(allVisitors);
    } catch (error){
    res.status(404).json({ message: error.message });
    }
}

export const getSingleVisitor = async (req, res) => {
  try {
      const singleVisitor = await Visitor.findById(req.params.visitorId);
      if (!singleVisitor) {
          return res.status(404).json({ message: "Visitor not found" });
      }
      res.json(singleVisitor);
  } catch (error) {
      console.error("Error fetching single visitor:", error);
      res.status(500).json({ message: "An error occurred while fetching visitor" });
  }
};

export const submitUpdateRequest = async (req, res) => {
  try {
    const officerId = req.body.officerId;
    const criminalId = req.params.criminalId;
    const criminal = await Criminal.findById(criminalId);

    if (!criminal) {
      return res.status(404).json({
        success: false,
        message: 'Criminal not found!',
      });
    }

    const allowedFields = ['firstname', 'lastname', 'gender', 'DOB', 'crime', 'dateCommitted', 'reportedBy', 'LGA'];
    const dataToUpdate = {};
    const fieldsToUpdate = [];

    for (const field of allowedFields) {
      if (req.body.hasOwnProperty(field)) {
        dataToUpdate[field] = req.body[field];
        fieldsToUpdate.push(field);
        criminal[field] = req.body[field]; // Update the criminal data directly
      }
    }

    // Create an update request object
    const updateRequest = new PendingUpdateRequest({
      officerId,
      originalData: criminal.toObject(),
      dataToUpdate,
      fieldsToUpdate,
      comments: req.body.comments,
    });

    // Save the update request to the database
    await updateRequest.save();
    await criminal.save(); // Save the updated criminal data

    // Send a success response
    res.status(200).json({
      success: true,
      message: 'Update request submitted!',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
