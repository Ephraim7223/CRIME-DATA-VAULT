import express from "express";
const router = express.Router();


import {getAllCriminals,getAllVisitors, getSingleCriminal, getSingleVisitor,submitUpdateRequest } from "../../controllers/user/officer.controller.js"; 
import { officerSignup} from "../../controllers/user/officerAuth_controller.js";
import { addCriminal } from "../../controllers/crime/criminal.controllers.js";
import { Search } from "../../controllers/search.controller.js";
import { addVisitor } from "../../controllers/visitors/visitor.controllers.js";
// import {authenticateOfficer} from "../../middlewares/auth.middleware.js"
import upload from "../../config/multer.js"

router.get('/criminals', getAllCriminals);
router.get('/visitors', getAllVisitors);

router.get('/criminal/:criminalId', getSingleCriminal);
router.get('/visitor/:visitorId', getSingleVisitor);

router.post('/register', officerSignup);

router.post("/addcriminal", 
upload("criminals").fields([{
    name : "image", maxCount : 1},
     {name : "fingerPrints", maxCount : 1}
    ]), 
addCriminal);

router.post("/search", Search)
router.post("/addvisitor", 
upload("visitors").fields([{
    name : "image", maxCount : 1},
     {name : "fingerPrints", maxCount : 1}
    ]), 
addVisitor);router.post("/search", Search)


// router.post("/addvisitor", upload("visitors").single("image"), addVisitor);
// router.post('/forgetpassword', forgetPassword);


router.post('/submitUpdateRequest/:criminalId', submitUpdateRequest);



export default router;
