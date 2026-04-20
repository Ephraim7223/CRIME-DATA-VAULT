import { verifyAccessToken } from '../utils/accessToken.js';
import { ActorKind } from '../constants/rbac.js';

/**
 * Bearer JWT → `req.auth` = { sub, kind, publicId?, isSuperAdmin? }
 */
export function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization;
    const token = header?.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    const decoded = verifyAccessToken(token);
    req.auth = {
      sub: decoded.sub,
      kind: decoded.kind,
      publicId: decoded.publicId,
      isSuperAdmin: decoded.isSuperAdmin === true,
    };
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
}

/** @param {...string} kinds - ActorKind values */
export function requireActorKinds(...kinds) {
  return (req, res, next) => {
    if (!req.auth?.kind || !kinds.includes(req.auth.kind)) {
      return res.status(403).json({ success: false, message: 'Insufficient permissions.' });
    }
    next();
  };
}

export function requireSuperAdmin(req, res, next) {
  if (req.auth?.kind !== ActorKind.ADMIN || !req.auth.isSuperAdmin) {
    return res.status(403).json({ success: false, message: 'Super-admin access required.' });
  }
  next();
}

/** Admin or officer (typical “staff” routes). */
export const staffAuth = [
  authenticate,
  requireActorKinds(ActorKind.ADMIN, ActorKind.OFFICER),
];

/** Officer-only. */
export const officerAuth = [authenticate, requireActorKinds(ActorKind.OFFICER)];

/** Any authenticated admin (JWT kind admin). */
export const adminAuth = [authenticate, requireActorKinds(ActorKind.ADMIN)];

/** Admin with isSuperAdmin on the token (set at login from Admin.isAdmin). */
export const superAdminAuth = [
  authenticate,
  requireActorKinds(ActorKind.ADMIN),
  requireSuperAdmin,
];
