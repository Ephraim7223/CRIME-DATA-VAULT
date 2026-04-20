import { randomUUID } from 'node:crypto';
import path from 'node:path';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

/** Cloudinary folder segment per app role (unchanged from legacy paths). */
export const ROLE_CLOUD_FOLDER = Object.freeze({
  criminals: 'CriminalsFile',
  visitors: 'VisitorsFiles',
  officers: 'OfficersFiles',
});

function resolveFolder(role) {
  const folder = ROLE_CLOUD_FOLDER[role];
  if (!folder) {
    throw new Error(`Invalid upload role: ${String(role)}`);
  }
  return folder;
}

function buildPublicId(originalName) {
  const base = path.parse(originalName).name || 'upload';
  const safe = base.replace(/[^\w.-]/g, '_').slice(0, 96);
  return `${Date.now()}-${randomUUID().slice(0, 8)}_${safe}`;
}

/**
 * @param {object} options
 * @param {keyof typeof ROLE_CLOUD_FOLDER} options.role
 * @param {'auto' | 'image' | 'video' | 'raw'} [options.resourceType='auto']
 * @param {ReadonlySet<string> | Iterable<string>} options.allowedMimeTypes
 * @param {ReadonlySet<string> | Iterable<string>} options.allowedExtensions — lowercase, with dot (e.g. '.png')
 * @param {number} [options.maxFileSizeBytes]
 * @param {string} [options.rejectionMessage]
 */
export function createCloudinaryMulter({
  role,
  resourceType = 'auto',
  allowedMimeTypes,
  allowedExtensions,
  maxFileSizeBytes = 10 * 1024 * 1024,
  rejectionMessage = 'Invalid file type.',
}) {
  const folder = resolveFolder(role);
  const mimeSet =
    allowedMimeTypes instanceof Set
      ? allowedMimeTypes
      : new Set(allowedMimeTypes);
  const extSet =
    allowedExtensions instanceof Set
      ? allowedExtensions
      : new Set(allowedExtensions);

  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder,
      resource_type: resourceType,
      public_id: (_req, file) => buildPublicId(file.originalname),
    },
  });

  const fileFilter = (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (mimeSet.has(file.mimetype) && extSet.has(ext)) {
      cb(null, true);
      return;
    }
    cb(new Error(rejectionMessage));
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: maxFileSizeBytes },
  });
}
