// middleware/authenticate.js
import jwt from "jsonwebtoken"
import Secret from "../config/jwt.config.js"


export const authenticateOfficer = (req, res, next) => {
  try {
    // Check if the request has the Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token not provided!',
      });
    }

    // Verify the JWT token using your Secret key
    const decodedToken = jwt.verify(token, Secret.secret);

    // Populate the req.user object with officer information
    req.user = decodedToken;

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    // Handle JWT verification errors
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token!',
    });
  }
};


