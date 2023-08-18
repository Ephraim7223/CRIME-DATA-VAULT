import express from "express";
const router = express.Router();
import {getAllOfficers, getSingleOfficer,updateCriminal } from "../../controllers/admin/admin.controller.js";
import { getAllCriminals, getAllVisitors, getSingleCriminal,getSingleVisitor } from "../../controllers/user/officer.controller.js";
import { adminLogin, adminSignup, adminLogout } from "../../controllers/admin/adminAuth_controller.js";
import { getAllPoliceStations, getSinglePoliceStation, createPoliceStation, assignOfficerToStation} from "../../controllers/policeStation/policeStation.controller.js";
import { officerSignup } from "../../controllers/user/officerAuth_controller.js";
import { Search } from "../../controllers/search.controller.js";
import {  approveUpdateRequest, rejectUpdateRequest } from "../../controllers/admin/adminUpdate.controller.js";
import { isAdmin } from "../../controllers/admin/isAdmin.controller.js";
import { getPendingUpdateRequests } from "../../controllers/admin/pendingUpdate.js";

// router.use(isAdmin);
router.get('/officers', getAllOfficers);
router.get('/criminals', getAllCriminals);
router.get('/visitors', getAllVisitors);
router.get('/policeStation', getAllPoliceStations);
router.get('/pendingrequests', isAdmin,getPendingUpdateRequests);
router.get('/:stationId', getSinglePoliceStation);
router.get('/officer/:officerId', getSingleOfficer);
router.get('/:criminalId', getSingleCriminal);

router.post("/search", Search)
router.post("/addStation", createPoliceStation)
router.post('/', adminSignup);
router.post('/officerSignup', officerSignup);

router.patch("/approve/:requestId", isAdmin,approveUpdateRequest);
router.patch("/reject/:requestId", isAdmin,rejectUpdateRequest);

router.post('/login', adminLogin);

router.put('/:officerId/assign-station/:stationId', assignOfficerToStation);
router.patch('/:criminalId', updateCriminal);
router.post("/logut", adminLogout)





export default router;
