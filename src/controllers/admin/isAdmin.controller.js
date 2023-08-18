import {Admin} from "../../models/admin/admin.model.js"

export const isAdmin = async (req, res, next) => {
  try {
    const adminId = req.body.adminId; // Assuming you have middleware that sets req.admin with admin information

    // Find the admin by their ID in the database
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found!" });
    }

    // Check if the admin is an admin based on the isAdmin field
    if (admin.isAdmin) {
      // If the admin is an admin, proceed to the next middleware/controller
      next();
    } else {
      // If the admin is not an admin, return an unauthorized response
      return res.status(403).json({ success: false, message: "Not authorized!" });
    }
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

