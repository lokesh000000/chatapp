import express from  "express";
import { user } from "../Controllers/maincontroller.js";
import protectRoute from "../secure/protectRoute.js";



const router = express.Router();

router.get("/" ,protectRoute, user)

export default router