import multer from 'multer';
import path from 'path';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const uploaded = (role) => {
  let folder;

  if (role === 'criminals') {
    folder = 'CriminalsFile';
//   } else if (role === 'visitors') {
//     folder = 'VisitorsFiles';
//   } else if (role === 'officers') {
//     folder = 'OfficersFiles';
  } else {
    throw new Error('Invalid role');
  }

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folder,
      resource_type: 'video', // Set the resource_type to 'video'
    },
    filename: (req, file, cb) => {
      const uniqueFilename = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueFilename);
    },
  });

  const uploadMiddleware = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  });

  return uploadMiddleware;
};

function checkFileType(file, cb) {
  const filetypes = /mp4|avi|mov|mkv/; // Add video file extensions you want to accept
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('ERROR: Please upload a valid video file');
  }
}

export default uploaded;
