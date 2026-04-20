import express from 'express';
import {
  getAllOfficers,
  getSingleOfficer,
  updateCriminal,
} from '../../controllers/admin/admin.controller.js';
import {
  getAllCriminals,
  getAllVisitors,
  getSingleCriminal,
  getSingleVisitor,
} from '../../controllers/user/officer.controller.js';
import { adminLogin, adminSignup, adminLogout } from '../../controllers/admin/adminAuth_controller.js';
import {
  getAllPoliceStations,
  getSinglePoliceStation,
  createPoliceStation,
  assignOfficerToStation,
} from '../../controllers/policeStation/policeStation.controller.js';
import { officerSignup } from '../../controllers/user/officerAuth_controller.js';
import { Search } from '../../controllers/search.controller.js';
import { approveUpdateRequest, rejectUpdateRequest } from '../../controllers/admin/adminUpdate.controller.js';
import { getPendingUpdateRequests, getSinglePendingUpdateRequest } from '../../controllers/admin/pendingUpdate.js';
import upload from '../../config/multer.js';
import { adminAuth, superAdminAuth } from '../../middlewares/auth.js';

const router = express.Router();

router.post('/', adminSignup);
router.post('/login', adminLogin);
router.post('/logut', adminLogout);

router.use(...adminAuth);

router.get('/officers', getAllOfficers);
router.get('/criminals', getAllCriminals);
router.get('/visitors', getAllVisitors);
router.get('/policeStation', getAllPoliceStations);
router.get('/station/:stationId', getSinglePoliceStation);
router.get('/officer/:officerId', getSingleOfficer);
router.get('/criminal/:criminalId', getSingleCriminal);
router.get('/visitor/:visitorId', getSingleVisitor);

router.post('/search', Search);
router.post('/addStation', createPoliceStation);
router.post(
  '/officerSignup',
  upload('officers').fields([
    { name: 'image', maxCount: 1 },
    { name: 'fingerPrints', maxCount: 1 },
  ]),
  officerSignup
);

router.post('/assign-station', assignOfficerToStation);

router.get('/pendingrequests', ...superAdminAuth, getPendingUpdateRequests);
router.get('/pendingrequests/:requestId', ...superAdminAuth, getSinglePendingUpdateRequest);
router.patch('/approve/:requestId', ...superAdminAuth, approveUpdateRequest);
router.patch('/reject/:requestId', ...superAdminAuth, rejectUpdateRequest);

router.patch('/:criminalId', updateCriminal);

export default router;
