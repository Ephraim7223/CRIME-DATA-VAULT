import  {Admin}  from "../../models/admin/admin.model.js";
import Criminal from "../../models/criminal/criminal.models.js";
import Officer from "../../models/user/officer.model.js";
import Visitors from "../../models/visitor/visitor.model.js";

export const getAllOfficers = async(req, res) => {
  try {
    const allOfficers = await Officer.find();
    res.status(200).json(allOfficers);
  } catch(error){
    res.status(404).json({ message: error.message });
  }
}

export const getSingleOfficer = async(req, res) => {
  try{
    const singleOfficer = await Officer.findById(req.params.officerId)
    if (!singleOfficer) {
      return res.status(404).json({ error: 'Officer not found' });
    }
    res.json(singleOfficer);
  }catch (error){
    res.status(409).json({message: error.message});
  }
};

export const getAllCriminals = async(req, res) => {
  try{
        const allCriminals = await Criminal.find();
        res.status(200).json(allCriminals);
    }catch(error){
        res.status(400).json({ message: error.message });
    };
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
  try {
    const allVisitors = await Visitors.find();
    res.status(200).json(allVisitors);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getSingleVisitor = async(req, res) => {
  try{
    const singleVisitor = await Visitors.findById(req.params.visitorId)
    if (!singleVisitor) {
      return res.status(404).json({ error: 'Visitor not found' });
    }
    res.json(singleVisitor);
  }catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const updateCriminal = async (req, res) => {
    try {
        
      // Find the criminal document by its ID
      const criminal = await Criminal.findById(req.params.criminalId);
  
      if (!criminal) {
        // If the criminal document with the specified ID is not found, return an error response
        return res.status(404).json({
          success: false,
          message: 'Criminal not found!',
        });
      }

    // Check if the criminal record is already approved
      if (criminal.approved) {
        return res.status(400).json({
          success: false,
          message: 'This criminal record is already approved and cannot be updated!',
        });
      }
  
      // Update the fields with the new values from the request body (if provided)
      if (req.body.firstname) {
        criminal.firstname = req.body.firstname;
      }

      if (req.body.LGA) {
        criminal.LGA = req.body.LGA;
      }

      if (req.body.gender) {
        criminal.gender = req.body.gender;
      }
  
      if (req.body.frequency) {
        criminal.frequency = req.body.frequency;
      }

      if (req.body.reportedBy) {
        criminal.reportedBy = req.body.reportedBy;
      }

      if (req.body.dateCommitted) {
        criminal.dateCommitted = req.body.dateCommitted;
      }

      if (req.body.DOB) {
        criminal.DOB = req.body.DOB;
      }

      if (req.body.lastname) {
        criminal.lastname = req.body.lastname;
      }

      if (req.body.state) {
        criminal.state = req.body.state;
      }
  
      if (req.body.middlename) {
        criminal.middlename = req.body.middlename;
      }
  
      if (req.body.crime) {
        criminal.crime = req.body.crime;
      }
  
    // Set the updatePending field to true to indicate that the update is pending confirmation
    criminal.updatePending = true;

      // Save the updated criminal document to the database
      await criminal.save();
  
      // Send a success response
      res.status(200).json({
        success: true,
        message: 'Criminal details updated successfully!',
      });
    } catch (err) {
      // Handle any errors that occur during the update process
      res.status(500).json({ message: err.message });
    }
  };
