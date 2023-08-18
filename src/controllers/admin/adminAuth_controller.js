import {Admin} from "../../models/admin/admin.model.js";
import { loginValidator, registerValidator } from "../../validation/admin.validator.js"
import { formatZodError } from "../../utils/errorMessage.js";
import  cryptoHash from "crypto"


function generateRandomNumber(digits){
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function hashValue(value) {
  const hash = cryptoHash.createHash('sha256');
  hash.update(value);
 return  hash.digest('base64')}

export const adminSignup = async(req, res) => {

  const signupResult = registerValidator.safeParse(req.body);
  if (!signupResult.success) {
      return res.status(400).json(formatZodError(signupResult.error.issues));
  }
  try{
    const admin = await Admin.findOne({ email: req.body.email})
      if (admin) {
        res.status(409).json({message: "Admin already exists"})
  } else {
      const encryptedPassword = hashValue(req.body.password)
      const firstname  = req.body.firstname;
      const lastname  = req.body.lastname;
      const firstLetter = firstname.charAt(0).toUpperCase();
      const lastLetter = lastname.charAt(0).toUpperCase();
      const randomNumber = generateRandomNumber(4);
      const adminID = `ADMIN${randomNumber}${firstLetter}${lastLetter}`

      const newAdmin = new Admin({
      ID: adminID,
      firstname: firstname,
      lastname: lastname,
      name: firstname + ' ' + lastname,
      password: encryptedPassword,
      email: req.body.email,
      isAdmin: true
      });
      await newAdmin.save()
      res.json(`Admin id is ${newAdmin.ID}`);
    } 
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

export const adminLogin = async (req, res) => {
  const loginResult = loginValidator.safeParse(req.body);
  if (!loginResult.success) {
    return res.status(401).json(formatZodError(loginResult.error.issues));
  }
  
  try {
    const id = req.body.id;
    const password = req.body.password;

    const admin = await Admin.findOne({ id });

    if (!admin) {
      return res.status(404).json({ error: true, message: 'Admin not found.' });
    }

    if (admin.password === "") {
      // Password needs to be set
      const hashedPassword = await hashValue(password);
      await Admin.updateOne({ id: admin.id }, { password: hashedPassword, verified: true });
      return res.status(200).json({ success: true, message: 'Password set and logged in.' });
    }

    const passwordMatched = await hashValue(password);
    if (passwordMatched === admin.password) {
      await Admin.updateOne({ id: admin.id }, { Status: 'active' });
      return res.status(200).json({ success: true, message: 'Logged in successfully.' });
    } else {
      return res.status(401).json({ error: true, message: 'Invalid credentials.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: 'Could not log in admin.', error: error.message });
  }
};


export const adminLogout = async(req,res) => {
    res.clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json({
        message: "Admin has been logged out."
    });
}