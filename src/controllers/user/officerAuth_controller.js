import Officer from "../../models/user/officer.model.js";
import { loginValidator, registerValidator } from "../../validation/officer.validator.js"
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

export const officerSignup = async(req, res) => {

  const signupResult = registerValidator.safeParse(req.body);
  if (!signupResult.success) {
      return res.status(400).json(formatZodError(signupResult.error.issues));
  }
  try{
    const officer = await Officer.findOne({email:req.body.email})
      if (officer) {
        res.status(409).json({message: "Officer already exists"})
  } else {
      // const encryptedPassword = hashValue(req.body.password)
      const middleName = req.body.middleName
      const age = req.body.age
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
      const nextOfKinContact = req.body.nextOfKinContact
      const rank = req.body.rank
      const town = req.body.town
      const appointmentDate = req.body.appointmentDate
      const contactLine = req.body.contactLine
      const policeId = req.body.policeId
      const maritalStatus = req.body.maritalStatus
      const DOB = req.body.DOB
      const eyeColor  = req.body.eyeColor
      const currentStation = req.body.currentStation
      const firstName  = req.body.firstName;
      const lastName  = req.body.lastName;
      const firstLetter = firstName.charAt(0).toUpperCase();
      const lastLetter = lastName.charAt(0).toUpperCase();
      const randomNumber = generateRandomNumber(5);
      const officerId = `OFFICER${firstLetter}${randomNumber}${lastLetter}`

      const newOfficer = new Officer({
      ID: officerId,
      firstName: firstName,
      lastName: lastName,
      age: age,
      middleName: middleName,
      name: firstName + " " + middleName + " " + lastName,
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

export const officerLogin = async (req, res) => {
  const loginResult = loginValidator.safeParse(req.body);
  if (!loginResult.success) {
    return res.status(401).json(formatZodError(loginResult.error.issues));
  }
   const officerID = req.body.ID
  try {
    const officer = await Officer.findOne({ID:officerID});

    if (!officer) {
      return res.json({message:'Please input valid details'});
    }else{ 
      const ID = req.body.ID;
      const password = req.body.password;
      const officer = await Officer.findOne({ID});
  
      if (officer) {
        if (officer.password === " ") {
          const hashedPassword = await  hashValue(req.body.password)
          await Officer.updateOne({ ID: officer.ID }, { password: hashedPassword,verified:true , });
          res.status(200).json({ message: 'Password set and logged in.' })
        } else {
          const passwordMatched = await hashValue(password)
          
          if (passwordMatched === officer.password) {
            res.status(200).json({ message: 'Logged in successfully.' })
            await Officer.updateOne({ ID: officer.ID }, { Status:'active' });
          } else {
            res.status(401).json({ message: 'Invalid credentials.' });
          }
        }
      }
       else {
        res.status(404).json({ message: 'officer not found.' });
      }
  
    
  } 
}catch (error) {
  console.log(error);
  return res.status(500).json({ message: 'Could not log in officer.' });
}}

export const officerLogout = async(req,res) => {
    res.clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json({
        message: "Officer has been logged out."
    });
}
