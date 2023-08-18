import multer from 'multer';
import path from "path";
import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudinary from './cloudinary.js';


const upload = (role) => {
const folder = role === "criminals" ? "CriminalsFile" : "VisitorsFiles";
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folder,
      resource_type: 'auto'
    },
    filename: (req, file, cb) => {
      const uniqueFilename = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueFilename);
    }
  });

const uploadMiddleware = multer({
    storage: storage,

    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    },
});
  return uploadMiddleware
};
function checkFileType(file, cb) {
    const filetypes =  /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
 
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("ERROR: Kindly please upload a valid filetype");
    }
}

export default upload;