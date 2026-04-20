import crypto from 'crypto';
import { Admin } from '../../models/admin/admin.model.js';
import { loginValidator, registerValidator } from '../../validation/admin.validator.js';
import { formatZodError } from '../../utils/errorMessage.js';
import { signAccessToken } from '../../utils/accessToken.js';
import { ActorKind } from '../../constants/rbac.js';

function generateRandomNumber(digits) {
  const min = 10 ** (digits - 1);
  const max = 10 ** digits - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hashValue(value) {
  return crypto.createHash('sha256').update(value).digest('base64');
}

export const adminSignup = async (req, res) => {
  const signupResult = registerValidator.safeParse(req.body);
  if (!signupResult.success) {
    return res.status(400).json(formatZodError(signupResult.error.issues));
  }
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (admin) {
      return res.status(409).json({ message: 'Admin already exists' });
    }
    const encryptedPassword = hashValue(req.body.password);
    const { firstname, lastname } = req.body;
    const firstLetter = firstname.charAt(0).toUpperCase();
    const lastLetter = lastname.charAt(0).toUpperCase();
    const randomNumber = generateRandomNumber(4);
    const adminID = `ADMIN${randomNumber}${firstLetter}${lastLetter}`;

    const newAdmin = new Admin({
      ID: adminID,
      firstname,
      lastname,
      name: `${firstname} ${lastname}`,
      password: encryptedPassword,
      email: req.body.email,
      isAdmin: true,
    });
    await newAdmin.save();
    return res.json({ message: 'Admin created', publicId: newAdmin.ID });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const adminLogin = async (req, res) => {
  const loginResult = loginValidator.safeParse(req.body);
  if (!loginResult.success) {
    return res.status(400).json(formatZodError(loginResult.error.issues));
  }

  try {
    const { ID, password } = req.body;
    const admin = await Admin.findOne({ ID });

    if (!admin) {
      return res.status(404).json({ error: true, message: 'Admin not found.' });
    }

    const passwordMatched = hashValue(password);
    if (passwordMatched !== admin.password) {
      return res.status(401).json({ error: true, message: 'Invalid credentials.' });
    }

    const token = signAccessToken({
      sub: admin._id.toString(),
      kind: ActorKind.ADMIN,
      publicId: admin.ID,
      isSuperAdmin: admin.isAdmin === true,
    });

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      token,
      user: { id: admin._id, publicId: admin.ID, email: admin.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: 'Could not log in admin.' });
  }
};

export const adminLogout = async (req, res) => {
  res
    .clearCookie('accessToken', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json({
      message: 'Admin has been logged out.',
    });
};
