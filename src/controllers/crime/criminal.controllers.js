import Criminal from "../../models/criminal/criminal.models.js";
import { addCriminalValidator } from "../../validation/criminal.validator.js";
import { formatZodError } from "../../utils/errorMessage.js";
import upload from "../../config/multer.js";

function generateRandomNumber(digits, baseNumber = 0) {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  const randomOffset = Math.floor(Math.random() * (max - min + 1));
  const generatedNumber = min + randomOffset;
  const increasedNumber = generatedNumber + baseNumber;
  return increasedNumber;
}

export const addCriminal = async(req, res) => {

    const addCriminalResult = addCriminalValidator.safeParse(req.body);
    if (!addCriminalResult.success) {
        return res.status(400).json(formatZodError(addCriminalResult.error.issues));
    }
    try{
      const image = req.file;
      const criminal = await Criminal.findOne({ID: req.body.ID});
        if (criminal) {
          res.status(409).json({message: "Criminal already exists"})
          if (image) {
            const imageUrl = image.url || image.path;
            criminal.image = imageUrl;
          }
    } else {
        const eyecolor = req.body.eyecolor
        const haircolor = req.body.haircolor
        const crime = req.body.crime
        const gender = req.body.gender
        const status = req.body.status
        const occupation = req.body.occupation
        const weight = req.body.weight
        const bloodGroup = req.body.bloodGroup
        const height = req.body.height
        const category = req.body.category
        const town = req.body.town
        const state = req.body.state
        const contactRelationship = req.body.contactRelationship
        const complexion = req.body.complexion
        const DOB = req.body.DOB
        const contactaddress = req.body.contactaddress
        const dateCommitted = req.body.dateCommitted
        const dateConvicted = req.body.dateConvicted
        const sentence = req.body.sentence
        const LGA = req.body.LGA
        const reportedBy = req.body.reportedBy
        const Contactfirstname = req.body.Contactfirstname
        const age = req.body.age
        const Contactlastname = req.body.Contactlastname
        const Contactmiddlename = req.body.Contactmiddlename
        const maritalStatus = req.body.maritalStatus
        const correctionalCenter = req.body.correctionalCenter
        const contactLine = req.body.contactLine
        const address = req.body.address 
        const firstname  = req.body.firstname;
        const nationality  = req.body.nationality
        const lastname  = req.body.lastname;
        const middlename = req.body.middlename;
        const firstLetter = firstname.charAt(0).toUpperCase();
        const lastLetter = lastname.charAt(0).toUpperCase();
        // const randomNumber = generateRandomNumber(3);
        const increasedNumber = generateRandomNumber(4, 1);
        const criminalId = `CRIMINAL${firstLetter}${increasedNumber}${lastLetter}`
        // const imageUrl = req.file.path;
        // const fingerPrintUrl = req.file.path 
    
        const urls = [];
        const CriminalsFile = req.files;
        for (const field in CriminalsFile) {
          const files = CriminalsFile[field];
          for (const file of files) {
            const { path, fieldname } = file;
            urls.push({[fieldname]: path});
           };
        };
        // console.log("urls", urls)
        
        const newCriminal = new Criminal({
            ID: criminalId,
            firstname: firstname,
            image : urls[0].image,
            fingerPrints: urls[1].fingerPrints,
            // image: imageUrl,
            // fingerPrint: fingerPrintUrl,
            complexions:complexion,
            Contactfirstname: Contactfirstname,
            // fingerPrints: urls[1].fingerPrints,
            Contactlastname : Contactlastname,
            Contactmiddlename : Contactmiddlename,
            contactaddress:contactaddress,
            middlename: middlename,
            maritalStatus:maritalStatus,
            sentence: sentence,
            dateCommitted: dateCommitted,
            dateConvicted: dateConvicted,
            nationality:nationality,
            correctionalCenter: correctionalCenter,
            contactRelationship: contactRelationship,
            contactLine: contactLine,
            lastname: lastname,
            name: firstname + " " + middlename + " " + lastname,
            crime: crime,
            address :address,
            DOB: DOB,
            occupation: occupation,
            gender: gender,
            category: category,
            LGA: LGA,
            town: town,
            state: state,
            status: status,
            height: height,
            reportedBy:reportedBy,
            age: age,
            bloodGroup: bloodGroup,
            weight: weight,
            eyecolor: eyecolor,
            haircolor: haircolor,
        })
        await newCriminal.save()
        res.json(`Criminal ID is ${newCriminal.ID}`);
      }
    } catch (err) {
        console.log(err);
      res.status(500).json({message: err.message});
    }
};
