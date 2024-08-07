import  express from "express";
import { getmessage, sendmessage } from "../Controllers/messagecontroller.js";
import protectRoute from "../secure/protectRoute.js"


const router = express.Router();


router.post("/send/:id" ,protectRoute, sendmessage)
router.post("/:id" ,protectRoute, getmessage)
 


export default router