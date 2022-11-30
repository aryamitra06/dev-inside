import express from "express";
import { auth } from "../middleware/auth.js";
import { getMyProfile, createUpdateProfile } from "../controller/profile.js";
const router = express.Router();

/*
@route: /me
@method: GET
@access: Private
@desc: Getting profile details
*/
router.get("/me", auth, getMyProfile);

/*
@route: /createupdateprofile
@method: POST
@access: Private
@desc: Creating new profile
*/
router.post("/createupdateprofile", auth, createUpdateProfile);

export default router;