import bcrypt from 'bcrypt';
import Officer from '../../models/user/officer.model.js';
import { registerValidator, loginValidator } from '../../validation/officer.validator.js';
import { formatZodError } from '../../utils/errorMessage.js';
import { signAccessToken } from '../../utils/accessToken.js';
import { ActorKind } from '../../constants/rbac.js';

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

export const officerSignup = async (req, res) => {
  const signupResult = registerValidator.safeParse(req.body);
  if (!signupResult.success) {
    return res.status(400).json(formatZodError(signupResult.error.issues));
  }

  try {
    const existing = await Officer.findOne({ email: req.body.email });
    if (existing) {
      return res.status(409).json({ message: 'Officer already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const {
      middleName,
      email,
      address,
      gender,
      lga,
      state,
      nationality,
      height,
      weight,
      haircolor,
      bloodGroup,
      nextOfKin,
      nextOfKinAddress,
      rank,
      town,
      policeId,
      maritalStatus,
      DOB,
      eyeColor,
      currentStation,
      firstName,
      lastName,
      appointmentDate,
      loginID,
    } = req.body;

    const age = String(calculateAge(DOB));
    const firstLetter = firstName.charAt(0).toUpperCase();
    const lastLetter = lastName.charAt(0).toUpperCase();
    const randomNumber = generateRandomNumber(5);
    const officerId = `OFFICER${firstLetter}${randomNumber}${lastLetter}`;
    const contactLine = String(req.body.contactLine);
    const nextOfKinContact = String(req.body.nextOfKinContact);

    const urls = [];
    const OfficersFiles = req.files;
    if (OfficersFiles) {
      for (const field of Object.keys(OfficersFiles)) {
        const files = OfficersFiles[field];
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

    const newOfficer = new Officer({
      ID: officerId,
      loginID,
      password: hashedPassword,
      firstName,
      lastName,
      age,
      image: imageUrl,
      fingerPrints: fingerUrl,
      middleName,
      name: `${firstName} ${middleName} ${lastName}`,
      email,
      nextOfKin,
      nextOfKinAddress,
      nextOfKinContact,
      height,
      weight,
      maritalStatus,
      bloodGroup,
      policeId,
      DOB,
      haircolor,
      contactLine,
      eyeColor,
      currentStation,
      appointmentDate,
      town,
      nationality,
      state,
      address,
      gender,
      lga,
      rank,
    });

    await newOfficer.save();
    return res.json({ message: 'Officer created', publicId: newOfficer.ID });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const officerLogin = async (req, res) => {
  const loginResult = loginValidator.safeParse(req.body);
  if (!loginResult.success) {
    return res.status(401).json(formatZodError(loginResult.error.issues));
  }

  const { loginID, password } = req.body;

  try {
    const officer = await Officer.findOne({ loginID });

    if (!officer) {
      return res.status(404).json({ error: 'Officer not found' });
    }

    const passwordMatch = await bcrypt.compare(password, officer.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    officer.activeSession = true;
    await officer.save();

    const token = signAccessToken({
      sub: officer._id.toString(),
      kind: ActorKind.OFFICER,
      publicId: officer.ID,
    });

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: officer._id, publicId: officer.ID },
    });
  } catch (error) {
    console.error('Error during officer login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const officerLogout = async (req, res) => {
  try {
    const officer = await Officer.findById(req.auth.sub);

    if (!officer) {
      return res.status(404).json({ error: 'Officer not found' });
    }

    officer.activeSession = false;
    await officer.save();

    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during officer logout:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
