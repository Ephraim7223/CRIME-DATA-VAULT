import express from "express";
const router  = express.Router();

/** Import all controllers */
import Criminal from "../../controllers/crime/criminal.controllers.js";

/** POST METHODS */
router.route('/addRecord').post((req,res) =>res.json('register route'));

/** GET METHODS */


/** PUT METHODS */
router.route('/updaterecords').put();


export default router;