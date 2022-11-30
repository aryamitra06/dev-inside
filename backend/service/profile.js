import express from "express";
import { auth } from "../middleware/auth.js";
import { getMyProfile, createUpdateProfile, getAllProfiles, getProfileById } from "../controller/profile.js";
const router = express.Router();

/*
@route: /me
@method: GET
@access: Private
@desc: Getting profile details
*/
router.get("/me", auth, getMyProfile);

/*
@route: /allprofiles
@method: GET
@access: Public
@desc: Getting all profile details
*/
router.get("/allprofiles", getAllProfiles);

/*
@route: /allprofiles/profile/:id
@method: GET
@access: Public
@desc: Getting profile by id
*/
router.get("/allprofiles/profile/:id", getProfileById);


/*
@route: /createupdateprofile
@method: POST
@access: Private
@desc: Creating new profile
*/
router.post("/createupdateprofile", auth, createUpdateProfile);



export default router;