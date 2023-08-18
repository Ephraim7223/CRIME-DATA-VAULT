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
    const originalData = criminal.toObject();

    // Create an update request object
    const updateRequest = new PendingUpdateRequest({
      officerId,
      originalData,
      dataToUpdate: {}, // Initialize an empty object for the updated data
      fieldsToUpdate: [], // Initialize an empty array for fields to update
      comments: req.body.comments,
    });

    // Check for updated values and add the field names to the fieldsToUpdate array if they exist
    if (req.body.firstName) {
      updateRequest.fieldsToUpdate.push('firstName');
      updateRequest.dataToUpdate.firstName = req.body.firstName;
      criminal.firstName = req.body.firstName;
    }
    

    if (req.body.gender) {
      updateRequest.fieldsToUpdate.push('gender');
      updateRequest.dataToUpdate.gender = req.body.gender;
      criminal.gender = req.body.gender;
    }

    if (req.body.frequency) {
      updateRequest.fieldsToUpdate.push('frequency');
      updateRequest.dataToUpdate.frequency = req.body.frequency;
      criminal.frequency = req.body.frequency;
    }

    if (req.body.DOB) {
      updateRequest.fieldsToUpdate.push('DOB');
      updateRequest.dataToUpdate.DOB = req.body.DOB;
      criminal.DOB = req.body.DOB;
    }

    if (req.body.lastName) {
      updateRequest.fieldsToUpdate.push('lastName');
      updateRequest.dataToUpdate.lastName = req.body.lastName;
      criminal.lastName = req.body.lastName;
    }

    if (req.body.middleName) {
      updateRequest.fieldsToUpdate.push('middleName');
      updateRequest.dataToUpdate.middleName = req.body.middleName;
      criminal.middleName = req.body.middleName;
    }

    if (req.body.crime) {
      updateRequest.fieldsToUpdate.push('crime');
      updateRequest.dataToUpdate.crime = req.body.crime;
      criminal.crime = req.body.crime;
    }

    if (req.body.dateCommitted) {
      updateRequest.fieldsToUpdate.push('dateCommitted');
      updateRequest.dataToUpdate.dateCommitted = req.body.dateCommitted;
      criminal.dateCommitted = req.body.dateCommitted;
    }

    if (req.body.reportedBy) {
      updateRequest.fieldsToUpdate.push('reportedBy');
      updateRequest.dataToUpdate.reportedBy = req.body.reportedBy;
      criminal.reportedBy = req.body.reportedBy;
    }

    if (req.body.LGA) {
      updateRequest.fieldsToUpdate.push('LGA');
      updateRequest.dataToUpdate.LGA = req.body.LGA;
      criminal.LGA = req.body.LGA;
    }

    updateRequest.dataToUpdate = {
      firstName: req.body.firstName,
      gender: req.body.gender,
      frequency: req.body.frequency,
      DOB: req.body.DOB,
      lastName: req.body.lastName,
      middleName: req.body.middleName,
      crime: req.body.crime,
      dateCommitted: req.body.dateCommitted,
      reportedBy: req.body.reportedBy,
      LGA: req.body.LGA,
    };
    // Save the update request to the database
    await updateRequest.save();

    // Send a success response
    res.status(200).json({
      success: true,
      message: 'Update request submitted!',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
