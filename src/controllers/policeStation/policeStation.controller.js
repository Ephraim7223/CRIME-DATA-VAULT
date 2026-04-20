import bcrypt from 'bcrypt';
import PoliceStation from '../../models/PoliceStation/policeStation.model.js';
import { addPoliceStationValidator } from '../../validation/policeStation.validator.js';
import { formatZodError } from '../../utils/errorMessage.js';
import Officer from '../../models/user/officer.model.js';

function generateRandomNumber(digits) {
  const min = 10 ** (digits - 1);
  const max = 10 ** digits - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomAlphaNumeric(length) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i += 1) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

function generateUniqueLoginID() {
  return `OFFICER${generateRandomAlphaNumeric(6)}`;
}

export const createPoliceStation = async (req, res) => {
  const addStationResult = addPoliceStationValidator.safeParse(req.body);
  if (!addStationResult.success) {
    return res.status(400).json(formatZodError(addStationResult.error.issues));
  }
  try {
    const addStation = await PoliceStation.findOne({
      $or: [{ stationName: req.body.stationName }, { location: req.body.location }],
    });
    if (addStation) {
      return res.status(409).json({ message: 'Station already exists' });
    }
    const { stationName, location, officers } = req.body;
    const randomNumber = generateRandomNumber(4);
    const stationID = `STATION${randomNumber}`;

    const newStation = new PoliceStation({
      stationName,
      location,
      officers: officers || [],
      ID: stationID,
    });
    await newStation.save();
    return res.json({ message: 'Station created', stationId: newStation.ID });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getAllPoliceStations = async (req, res) => {
  try {
    const stations = await PoliceStation.find().populate('officers', 'ID name email rank');
    return res.json(stations);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch police stations' });
  }
};

export const getSinglePoliceStation = async (req, res) => {
  try {
    const station = await PoliceStation.findById(req.params.stationId).populate(
      'officers',
      'ID name email rank'
    );
    if (!station) {
      return res.status(404).json({ error: 'Police station not found' });
    }
    return res.json(station);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch police station' });
  }
};

export const updatePoliceStation = async (req, res) => {
  try {
    const { name, location, officers } = req.body;
    const updatedStation = await PoliceStation.findByIdAndUpdate(
      req.params.id,
      { name, location, officers },
      { new: true }
    );
    if (!updatedStation) {
      return res.status(404).json({ error: 'Police station not found' });
    }
    return res.json(updatedStation);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update police station' });
  }
};

export const deletePoliceStation = async (req, res) => {
  try {
    const deletedStation = await PoliceStation.findByIdAndDelete(req.params.id);
    if (!deletedStation) {
      return res.status(404).json({ error: 'Police station not found' });
    }
    return res.json(deletedStation);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete police station' });
  }
};

export const assignOfficerToStation = async (req, res) => {
  try {
    const { officerID, stationID, password } = req.body;

    const officer = await Officer.findOne({ ID: officerID });
    if (!officer) {
      return res.status(404).json({ error: 'Officer not found' });
    }

    const policeStation = await PoliceStation.findOne({ ID: stationID });
    if (!policeStation) {
      return res.status(404).json({ error: 'Police station not found' });
    }

    const loginID = generateUniqueLoginID();
    const hashedPassword = await bcrypt.hash(password, 10);

    officer.loginID = loginID;
    officer.password = hashedPassword;
    officer.station = policeStation._id;
    officer.currentStation = policeStation.stationName;
    officer.assignDate = new Date();

    await officer.save();

    if (!policeStation.officers.some((id) => id.equals(officer._id))) {
      policeStation.officers.push(officer._id);
      await policeStation.save();
    }

    return res.json({
      message: 'Officer assigned to the police station successfully',
      loginID,
      password,
    });
  } catch (error) {
    console.error('Error assigning officer:', error);
    return res.status(500).json({ error: 'Failed to assign officer to the police station' });
  }
};
