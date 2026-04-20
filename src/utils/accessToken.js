import jwt from 'jsonwebtoken';
import jwtSecret from '../config/jwt.config.js';
import { ActorKind } from '../constants/rbac.js';

const DEFAULT_EXPIRES = process.env.JWT_EXPIRES_IN || '7d';

function assertSecret() {
  if (!jwtSecret || typeof jwtSecret !== 'string') {
    throw new Error('JWT_SECRET is not set');
  }
}

/**
 * @param {object} payload
 * @param {string} payload.sub - Mongo _id
 * @param {typeof ActorKind[keyof typeof ActorKind]} payload.kind
 * @param {string} [payload.publicId]
 * @param {boolean} [payload.isSuperAdmin]
 */
export function signAccessToken(payload) {
  assertSecret();
  return jwt.sign(payload, jwtSecret, { expiresIn: DEFAULT_EXPIRES });
}

export function verifyAccessToken(token) {
  assertSecret();
  return jwt.verify(token, jwtSecret);
}
