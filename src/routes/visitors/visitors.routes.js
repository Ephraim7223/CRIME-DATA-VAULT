import { Router } from "express";
const router  = Router();

/** Import all controllers */
import { getAllVisitors } from "../../controllers/user/officer.controller.js";

/** POST METHODS */
router.route('/addVisitor').post((req,res) =>res.json(''));

/** GET METHODS */
// router.route('/').get((req,res) => res.json(''));
router.get('/', getAllVisitors);

/** PUT METHODS */
router.route('/updateVisitorss').put();


export default router;