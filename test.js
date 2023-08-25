// function getThreeLongestWordsAsHashtags(inputString) {
//     // Step 1: Split the input string into an array of words
//     const wordsArray = inputString.split(" ");
  
//     // Step 2: Sort the words array in descending order based on word length
//     wordsArray.sort((a, b) => b.length - a.length);
  
//     // Step 3: Take the first three longest words (or fewer if there are less than 3 words in the array)
//     const threeLongestWords = wordsArray.slice(0, 3);
  
//     // Step 4: Convert the three longest words to hashtags
//     const hashtagsArray = threeLongestWords.map(word => `#${word}`);
  
//     return hashtagsArray;
//   }
  
//   // Test the function
//   const inputString = "This is a sample string containing some words";
//   const result = getThreeLongestWordsAsHashtags(inputString);
//   console.log(result);
  



// import Criminal from '../models/criminal/criminal.models.js';
// import Visitor from '../models/visitor/visitor.model.js';
// import Officer from '../models/user/officer.model.js';
// import PoliceStation from '../models/PoliceStation/policeStation.model.js';

// // Helper function to perform individual searches
// async function searchInCollection(collection, searchField, regex) {
//   return collection
//     .find({
//       $or: [
//         { [searchField]: regex },
//         { ID: searchField },
//       ],
//     })
//     .exec();
// }

// // Perform searches in different collections
// export const Search = async (req, res) => {
//   try {
//     // Get the search term from the request body
//     const search = req.body.search;
//     const regex = new RegExp(search, 'i');

//     // Perform searches in parallel using Promise.all
//     const searchedItems = await Promise.all([
//       searchInCollection(Criminal, regex, 'firstname'),
//       searchInCollection(Criminal, regex, 'lastname'),
//       searchInCollection(Criminal, regex, 'middlename'),
//       searchInCollection(Criminal, search, 'ID'),
//       searchInCollection(Criminal, search, 'crime'),
//       searchInCollection(Criminal, search, 'correctionalCenter'),
//       searchInCollection(Visitor, regex, 'firstname'),
//       searchInCollection(Visitor, regex, 'lastname'),
//       searchInCollection(Visitor, regex, 'middlename'),
//       searchInCollection(Visitor, search, 'ID'),
//       searchInCollection(Visitor, search, 'correctionalCenter'),
//       searchInCollection(Officer, regex, 'firstname'),
//       searchInCollection(Officer, regex, 'lastname'),
//       searchInCollection(Officer, regex, 'middlename'),
//       searchInCollection(Officer, search, 'ID'),
//       searchInCollection(Officer, search, 'rank'),
//     ]);

//     // Searching for stations by name, location, ID, or officers
//     const stations = await PoliceStation.find({
//       $or: [
//         { stationName: regex },
//         { location: regex },
//         { ID: search },
//         { officers: regex },
//       ],
//     }).exec();

//     // Flatten the results and remove any falsy values
//     const persons = searchedItems.flat().filter(Boolean);

//     if (persons.length === 0 && stations.length === 0) {
//       // If no matching persons or stations found, return an error message
//       return res.status(404).json({ error: 'No matching user or station found' });
//     }

//     // Return the search results
//     res.json([...persons, ...stations]);
//   } catch (error) {
//     // Handle any unexpected errors
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };





