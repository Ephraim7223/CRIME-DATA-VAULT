import express from 'express';
import { getCriminal } from '../../controllers/general/general.controller.js';
import { staffAuth } from '../../middlewares/auth.js';

const router = express.Router();

router.get('/criminal/:id', ...staffAuth, getCriminal);

export default router;
