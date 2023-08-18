import Criminal from '../models/criminal/criminal.models.js';
import Visitor from '../models/visitor/visitor.model.js';
import Officer from '../models/user/officer.model.js';
import PoliceStation from '../models/PoliceStation/policeStation.model.js';

export const Search = async (req, res) => {
  try {
    // Get the search term from the request body
    const search = req.body.search;
    const regex = new RegExp(search, 'i');

    // Perform searches in parallel using Promise.all
    const searchedItems = await Promise.all([
      searchCriminal(search, regex),
      searchVisitor(search, regex),
      searchOfficer(search, regex),
    ]);

    // Flatten the results and remove any falsy values
    const persons = searchedItems.flat().filter(Boolean);

    if (persons.length === 0) {
      // If no matching persons found, return an error message
      return res.status(404).json({ error: 'No matching user found' });
    }

    // Return the search results
    res.json(persons);
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Search criminals by firstname, lastname, middlename, ID, crime, or correctionalCenter
async function searchCriminal(search, regex) {
  return Criminal.find({
    $or: [
      { firstname: regex },
      { lastname: regex },
      { middlename: regex },
      { ID: search },
      { crime: search },
      { correctionalCenter: search },
    ],
  }).exec();
}

// Search visitors by firstname, lastname, middlename, ID, or correctionalCenter
async function searchVisitor(search, regex) {
  return Visitor.find({
    $or: [
      { firstname: regex },
      { lastname: regex },
      { middlename: regex },
      { ID: search },
      { correctionalCenter: search },
    ],
  }).exec();
}

// Search officers by firstname, lastname, middlename, ID, or rank
async function searchOfficer(search, regex) {
  return Officer.find({
    $or: [
      { firstname: regex },
      { lastname: regex },
      { middlename: regex },
      { ID: search },
      { rank: search },
    ],
  }).exec();
}

// Search police stations by name, location, ID, or officers
async function searchPoliceStation(search, regex) {
  return PoliceStation.find({
    $or: [
      { stationName: regex },
      { location: regex },
      { ID: search },
      { officers: regex },
    ],
  }).exec();
}
