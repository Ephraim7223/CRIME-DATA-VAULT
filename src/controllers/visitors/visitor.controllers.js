import Visitor from "../../models/visitor/visitor.model.js";
import { addVisitorValidator } from "../../validation/visitor.validator.js";
import { formatZodError } from "../../utils/errorMessage.js";

function generateRandomNumber(digits){
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  export const addVisitor = async(req, res) => {

    const addVisitorResult = addVisitorValidator.safeParse(req.body);
    if (!addVisitorResult.success) {
        return res.status(400).json(formatZodError(addVisitorResult.error.issues));
    }
    try{
      const visitor = await Visitor.findOne({  });
        if (visitor) {
          res.status(409).json({message: "Visitor already exists"})
    } else {
        const eyecolor = req.body.eyecolor
        const haircolor = req.body.haircolor
        const gender = req.body.gender
        const relationshipWithInmate = req.body. relationshipWithInmate
        const occupation = req.body.occupation
        const weight = req.body.weight
        const height = req.body.height
        const phoneNumber = req.body.phoneNumber
        const town = req.body.town
        const state = req.body.state
        const lastVisitDate = req.body.lastVisitDate
        const DOB = req.body.DOB
        const LGA = req.body.LGA
        const visitorAddress = req.body.visitorAddress
        const firstname  = req.body.firstname;
        const bloodGroup = req.body.bloodGroup;
        const Frequency = req.body.Frequency;
        const inmateVisited = req.body.inmateVisited;
        const lastname  = req.body.lastname;
        // const image=req.body.image;
        const Nationality = req.body.Nationality;
        const correctionalCenter = req.body.correctionalCenter;
        const Age = req.body.Age;
        const visitPurpose = req.body.visitPurpose;
        const middlename = req.body.middlename;
        const maritalStatus = req.body.maritalStatus;
        const contactLine = req.body.contactLine;
        // const firstLetter = firstname.charAt(0).toUpperCase();
        // const lastLetter = lastname.charAt(0).toUpperCase();
        const randomNumber = generateRandomNumber(4);
        const visitorId = `VISITOR${randomNumber}`
  

        const urls = [];
        const VisitorsFile = req.files;
        for (const field in VisitorsFile) {
          const files = VisitorsFile[field];
          for (const file of files) {
            const { path, fieldname } = file;
            urls.push({[fieldname]: path});
           };
        };
        // const imageUrl = req.file.path;
        // console.log("Image URL:", imageUrl);


        const newVisitor = new Visitor({
            ID: visitorId,
            Age:Age,
            image: urls[0].image,
            fingerPrints: urls[1].fingerPrints,
            correctionalCenter:correctionalCenter,
            Nationality:Nationality,
            visitPurpose:visitPurpose,
            middlename:middlename,
            contactLine:contactLine,
            maritalStatus:maritalStatus,
            firstname: firstname,
            lastname: lastname,
            name: firstname + " " + middlename + " " + lastname,
            DOB:DOB,
            occupation:occupation,
            town:town,
            phoneNumber:phoneNumber,
            state:state,
            gender:gender,
            height:height,
            visitorAddress:visitorAddress,
            eyecolor:eyecolor,
            // visitorAddress:visitorAddress,
            weight:weight,
            relationshipWithInmate:relationshipWithInmate,
            Frequency:Frequency,
            bloodGroup:bloodGroup,
            lastVisitDate:lastVisitDate,
            inmateVisited:inmateVisited,
            LGA:LGA,
            haircolor:haircolor,
        })
        await newVisitor.save()
        res.json(`Visitor id is ${newVisitor.ID}`);
      } 
    } catch (err) {
        console.log(err);
      res.status(500).json({message: err.message});
    }
};