import Officer from "../../models/user/officer.model.js";
import { registerValidator ,loginValidator} from "../../validation/officer.validator.js"
import { formatZodError } from "../../utils/errorMessage.js";
import  cryptoHash from "crypto"

function generateRandomNumber(digits){
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function hashValue(value) {
//   const hash = cryptoHash.createHash('sha256');
//   hash.update(value);
//   return hash.digest('base64');
// }

function calculateAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();

  if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
    return age - 1;
  }

  return age;
}

export const officerSignup = async(req, res) => {

  const signupResult = registerValidator.safeParse(req.body);
  if (!signupResult.success) {
      return res.status(400).json(formatZodError(signupResult.error.issues));
  }

  try{
    const image = req.file;
    const officer = await Officer.findOne({email:req.body.email})
      if (officer) {
        res.status(409).json({message: "Officer already exists"})
        if (image) {
          const imageUrl = image.url || image.path;
          formData.image = imageUrl;}
  } else {
      // const encryptedPassword = hashValue(req.body.password)
      const middleName = req.body.middleName
      const email = req.body.email
      const address = req.body.address
      const gender = req.body.gender
      const lga = req.body.lga
      const state = req.body.state
      const nationality = req.body.nationality
      const height = req.body.height
      const weight = req.body.weight
      const haircolor = req.body.haircolor
      const bloodGroup = req.body.bloodGroup
      const nextOfKin = req.body.nextOfKin
      const nextOfKinAddress = req.body.nextOfKinAddress
      const rank = req.body.rank
      const town = req.body.town
      const policeId = req.body.policeId
      const maritalStatus = req.body.maritalStatus
      const DOB = req.body.DOB
      const eyeColor  = req.body.eyeColor
      const currentStation = req.body.currentStation
      const firstName  = req.body.firstName;
      const lastName  = req.body.lastName;
      const appointmentDate = req.body.appointmentDate;
      const age = calculateAge(DOB)
      const firstLetter = firstName.charAt(0).toUpperCase();
      const lastLetter = lastName.charAt(0).toUpperCase();
      const randomNumber = generateRandomNumber(5);
      const officerId = `OFFICER${firstLetter}${randomNumber}${lastLetter}`
      const contactLine = parseInt(req.body.contactLine, 10);
      const nextOfKinContact = parseInt(req.body.nextOfKinContact, 10);
  
      const urls = [];
      const OfficersFiles = req.files;
      
      if (OfficersFiles) { // Check if files are uploaded
        for (const field in OfficersFiles) {
          const files = OfficersFiles[field];
          for (const file of files) {
            const { path, fieldname } = file;
            urls.push({ [fieldname]: path });
          }
        }
      }

      const newOfficer = new Officer({
      ID: officerId,
      firstName: firstName,
      lastName: lastName,
      age: age,
      image: urls.find(url => url.hasOwnProperty('image'))?.image,
      fingerPrints: urls.find(url => url.hasOwnProperty('fingerPrints'))?.fingerPrints,
      middleName: middleName,
      name: `${firstName} + " " + ${middleName} + " " + ${lastName}`,
      email: email,
      // password: encryptedPassword,
      nextOfKin: nextOfKin,
      nextOfKinAddress: nextOfKinAddress,
      nextOfKinContact: nextOfKinContact,
      height: height,
      weight: weight,
      maritalStatus:maritalStatus,
      bloodGroup: bloodGroup,
      policeId: policeId,
      DOB: DOB,
      haircolor:haircolor,
      contactLine:contactLine,
      eyeColor:eyeColor,
      currentStation: currentStation,
      contactLine: contactLine,
      appointmentDate: appointmentDate,
      town:town,
      nationality: nationality,
      state: state,
      address: address,
      gender: gender,
      lga: lga,
      rank:rank,
      });
      await newOfficer.save()
      res.json(`Officer ID is ${newOfficer.ID}`);
    } 
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

import bcrypt from 'bcrypt';

export const officerLogin = async (req, res) => {
  const loginResult = loginValidator.safeParse(req.body);
  const { loginID, password } = req.body;
  
  if (!loginResult.success) {
    return res.status(401).json(formatZodError(loginResult.error.issues));
  }

  try {
    // Find the officer by loginID
    const officer = await Officer.findOne({ loginID });

    if (!officer) {
      return res.status(404).json({ error: 'Officer not found' });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, officer.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Assuming you have an "activeSession" field in your Officer model
    // Set the officer's session as active
    officer.activeSession = true;
    await officer.save();

    // Return a success message
    res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    console.error('Error during officer login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const officerLogout = async (req, res) => {
  try {
    // Assuming you have some way to identify the currently logged-in officer, like a session token or user ID
    const officerId = req.user.id; // Replace with the appropriate way to identify the officer

    // Find the officer by their ID
    const officer = await Officer.findById(officerId);

    if (!officer) {
      return res.status(404).json({ error: 'Officer not found' });
    }

    // Clear the active session by setting it to false
    officer.activeSession = false;
    await officer.save();

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during officer logout:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};