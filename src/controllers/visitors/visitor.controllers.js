import Visitor from '../../models/visitor/visitor.model.js';
import { addVisitorValidator } from '../../validation/visitor.validator.js';
import { formatZodError } from '../../utils/errorMessage.js';

function generateRandomNumber(digits) {
  const min = 10 ** (digits - 1);
  const max = 10 ** digits - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calculateAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age -= 1;
  }
  return age;
}

function isValidDate(date) {
  const currentDate = new Date();
  const inputDate = new Date(date);
  return inputDate <= currentDate;
}

export const addVisitor = async (req, res) => {
  const addVisitorResult = addVisitorValidator.safeParse(req.body);
  if (!addVisitorResult.success) {
    return res.status(400).json(formatZodError(addVisitorResult.error.issues));
  }
  const lastVisitDate = req.body.lastVisitDate;
  if (!isValidDate(lastVisitDate)) {
    return res.status(400).json({ error: 'Date cannot be in the future ' });
  }

  try {
    const eyecolor = req.body.eyecolor;
    const haircolor = req.body.haircolor;
    const gender = req.body.gender;
    const relationshipWithInmate = req.body.relationshipWithInmate;
    const occupation = req.body.occupation;
    const weight = req.body.weight;
    const height = req.body.height;
    const town = req.body.town;
    const state = req.body.state;
    const DOB = req.body.DOB;
    const LGA = req.body.LGA;
    const visitorAddress = req.body.visitorAddress;
    const firstname = req.body.firstname;
    const bloodGroup = req.body.bloodGroup;
    const Frequency = req.body.Frequency;
    const criminal = req.body.criminal;
    const lastname = req.body.lastname;
    const Nationality = req.body.Nationality;
    const correctionalCenter = req.body.correctionalCenter;
    const Age = String(calculateAge(DOB));
    const visitPurpose = req.body.visitPurpose;
    const middlename = req.body.middlename;
    const maritalStatus = req.body.maritalStatus;
    const contactLine = req.body.contactLine;
    const randomNumber = generateRandomNumber(4);
    const visitorId = `VISITOR${randomNumber}`;

    const urls = [];
    const VisitorsFiles = req.files;
    if (VisitorsFiles) {
      for (const field of Object.keys(VisitorsFiles)) {
        const files = VisitorsFiles[field];
        for (const file of files) {
          const { path: filePath, fieldname } = file;
          urls.push({ [fieldname]: filePath });
        }
      }
    }

    const imageUrl = urls.find((u) => Object.prototype.hasOwnProperty.call(u, 'image'))?.image;
    const fingerUrl = urls.find((u) =>
      Object.prototype.hasOwnProperty.call(u, 'fingerPrints')
    )?.fingerPrints;

    if (!imageUrl || !fingerUrl) {
      return res.status(400).json({ error: 'Image and fingerprints are required' });
    }

    const newVisitor = new Visitor({
      ID: visitorId,
      Age,
      image: imageUrl,
      fingerPrints: fingerUrl,
      correctionalCenter,
      Nationality,
      visitPurpose,
      middlename,
      contactLine,
      maritalStatus,
      firstname,
      lastname,
      name: `${firstname} ${middlename} ${lastname}`,
      DOB,
      occupation,
      town,
      state,
      gender,
      height,
      visitorAddress,
      eyecolor,
      weight,
      relationshipWithInmate,
      Frequency,
      bloodGroup,
      lastVisitDate,
      criminal,
      LGA,
      haircolor,
    });
    await newVisitor.save();
    return res.json({ message: 'Visitor created', id: newVisitor.ID });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
