import PoliceStation from "../../models/PoliceStation/policeStation.model.js"
import { addPoliceStationValidator } from "../../validation/policeStation.validator.js";
import { formatZodError } from "../../utils/errorMessage.js";
import Officer from "../../models/user/officer.model.js";

function generateRandomNumber(digits){
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Create a new police station
export const createPoliceStation = async (req, res) => {
  const addStationResult = addPoliceStationValidator.safeParse(req.body);
  if (!addStationResult.success) {
      return res.status(400).json(formatZodError(addStationResult.error.issues));
  }try {
    const addStation = await PoliceStation.findOne({$or:[{stationName: req.body.stationName}, {location: req.body.location}]})
      if (addStation) {
        res.status(409).json({message: "Station already exists"})
  } else {
      const { stationName, location, officers } = req.body;
      const randomNumber =generateRandomNumber(4)
      const stationID = `STATION${randomNumber}`


      const newStation = new PoliceStation({
      stationName: stationName,
      location: location,
      officers:officers,
      ID: stationID

      })
      await newStation.save()
      res.json(`Station ID is ${newStation.ID}`);
    } 
   }catch (error) {
        console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get all police stations
  export const getAllPoliceStations = async (req, res) => {
    try {
      const stations = await PoliceStation.find();
      res.json(stations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch police stations' });
    }
  };
  
  // Get a single police station by ID
  export const getSinglePoliceStation = async (req, res) => {
    try {
      const station = await PoliceStation.findById(req.params.stationId);
      if (!station) {
        return res.status(404).json({ error: 'Police station not found' });
      }
      res.json(station);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch police station' });
    }
  };
  
  // Update a police station
  export const updatePoliceStation = async (req, res) => {
    try {
      const { name, location } = req.body;
      const updatedStation = await PoliceStation.findByIdAndUpdate(
        req.params.id,
        { name, location },
        { new: true }
      );
      if (!updatedStation) {
        return res.status(404).json({ error: 'Police station not found' });
      }
      res.json(updatedStation);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update police station' });
    }
  };
  
  // Delete a police station
  export const deletePoliceStation = async (req, res) => {
    try {
      const deletedStation = await PoliceStation.findByIdAndRemove(req.params.id);
      if (!deletedStation) {
        return res.status(404).json({ error: 'Police station not found' });
      }
      res.json(deletedStation);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete police station' });
    }
  };
  
import crypto from 'crypto';
import bcrypt from 'bcrypt';

export const assignOfficerToStation = async (req, res) => {
  try {
    const { officerID, stationID } = req.params;

    // Find the officer by ID
    const officer = await Officer.findById(officerID);
    if (!officer) {
      return res.status(404).json({ error: 'Officer not found' });
    }

    // Find the police station by ID
    const policeStation = await PoliceStation.findById(stationID);
    if (!policeStation) {
      return res.status(404).json({ error: 'Police station not found' });
    }

    // Generate a unique login ID for the officer
    const loginID = generateUniqueLoginID();

    // Assign the officer to the police station
    officer.station = policeStation._id;
    officer.loginID = loginID; // Assign the generated login ID to the officer
    await officer.save();

    // Generate a random password for the officer
    const randomPassword = generateRandomPassword();

    // Hash the password before saving it to the officer's document
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
    officer.password = hashedPassword;
    await officer.save();

    // Update the police station to include the officer in its officers array
    policeStation.officers.push(officer._id);
    await policeStation.save();

    res.json({ 
      message: 'Officer assigned to the police station successfully', 
      loginID: loginID, // Include the generated login ID in the response
      password: randomPassword 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign officer to the police station' });
  }
};

// Function to generate a unique login ID for the officer
function generateUniqueLoginID() {
  const loginIDLength = 6; // You can adjust the login ID length as per your requirements
  const randomLoginID = generateRandomAlphaNumeric(loginIDLength);
  return `OFFICER${randomLoginID}`;
}

// Function to generate random alphanumeric strings
function generateRandomAlphaNumeric(length) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset.charAt(randomIndex);
  }
  return result;
}
