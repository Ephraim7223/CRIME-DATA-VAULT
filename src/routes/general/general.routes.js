import express from "express";
// import {getOfficer} from "../../controllers/general/general.controller.js";
import {getCriminal} from "../../controllers/general/general.controller.js";


const router = express.Router();

router.get('/criminal/:id', getCriminal)
// router.get("/officer/:id", getOfficer);

export default router;