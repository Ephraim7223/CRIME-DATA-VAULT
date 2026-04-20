import { Router } from 'express';
import { getAllVisitors } from '../../controllers/user/officer.controller.js';
import { staffAuth } from '../../middlewares/auth.js';

const router = Router();

router.get('/', ...staffAuth, getAllVisitors);

export default router;
