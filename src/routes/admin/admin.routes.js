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
import { getPendingUpdateRequests, getSinglePendingUpdateRequest } from "../../controllers/admin/pendingUpdate.js";
import upload from "../../config/multer.js"

// router.use(isAdmin);
router.get('/officers', getAllOfficers);
router.get('/criminals', getAllCriminals);
router.get('/visitors', getAllVisitors);
router.get('/policeStation', getAllPoliceStations);
router.get('/pendingrequests', isAdmin,getPendingUpdateRequests);
router.get('/station/:stationId', getSinglePoliceStation);
router.get('/officer/:officerId', getSingleOfficer);
router.get('/criminal/:criminalId', getSingleCriminal);
router.get('/visitor/:visitorId', getSingleVisitor);
router.get("/pendingrequests/:requestId", getSinglePendingUpdateRequest)

router.post("/search", Search)
router.post("/addStation", createPoliceStation)
router.post('/', adminSignup);
router.post('/officerSignup', 
upload("officers").fields([{
    name : "image", maxCount : 1},
     {name : "fingerPrints", maxCount : 1}
    ])
, officerSignup);

router.patch("/approve/:requestId", isAdmin,approveUpdateRequest);
router.patch("/reject/:requestId", isAdmin,rejectUpdateRequest);

router.post('/login', adminLogin);

router.put('/Assign/:officerID/assign-station/:stationID', assignOfficerToStation);
router.patch('/:criminalId', updateCriminal);
router.post("/logut", adminLogout)





export default router;
