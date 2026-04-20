import { createCloudinaryMulter } from './cloudinaryMulter.js';

const DOCUMENT_MIME = new Set([
  'image/jpeg',
  'image/png',
  'application/pdf',
]);

const DOCUMENT_EXT = new Set(['.jpg', '.jpeg', '.png', '.pdf']);

/**
 * Multer instance scoped by role (criminals | visitors | officers).
 * Accepts JPEG, PNG, and PDF for fingerprints / documents.
 */
const upload = (role) =>
  createCloudinaryMulter({
    role,
    resourceType: 'auto',
    allowedMimeTypes: DOCUMENT_MIME,
    allowedExtensions: DOCUMENT_EXT,
    maxFileSizeBytes: 10 * 1024 * 1024,
    rejectionMessage: 'Upload a JPEG, PNG, or PDF file.',
  });

export default upload;
