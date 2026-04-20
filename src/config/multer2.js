import { createCloudinaryMulter } from './cloudinaryMulter.js';

const VIDEO_MIME = new Set([
  'video/mp4',
  'video/quicktime',
  'video/x-msvideo',
  'video/x-matroska',
  'video/webm',
  'video/avi',
]);

const VIDEO_EXT = new Set(['.mp4', '.mov', '.avi', '.mkv', '.webm']);

/**
 * Multer for video uploads to Cloudinary (resource_type: video).
 * Same role → folder mapping as {@link ./multer.js}.
 */
const createVideoUpload = (role) =>
  createCloudinaryMulter({
    role,
    resourceType: 'video',
    allowedMimeTypes: VIDEO_MIME,
    allowedExtensions: VIDEO_EXT,
    maxFileSizeBytes: 100 * 1024 * 1024,
    rejectionMessage: 'Upload an MP4, MOV, AVI, MKV, or WebM video.',
  });

export default createVideoUpload;
