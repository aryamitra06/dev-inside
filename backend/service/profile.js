import express from "express";
import { auth } from "../middleware/auth.js";
import {
    getMyProfile,
    createProfile,
    updateProfile,
    getAllProfiles,
    getProfileById,
    deleteProfile,
    addProfileExperience,
    deleteProfileExperience,
    addProfileEducation,
    deleteProfileEducation,
    getGithubRepos
} from "../controller/profile.js";

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
@route: /createprofile
@method: POST
@access: Private
@desc: Creating new profile
*/
router.post("/createprofile", auth, createProfile);

/*
@route: /updateprofile
@method: PUT
@access: Private
@desc: Updating existing profile
*/
router.put("/editprofile", auth, updateProfile);

/*
@route: /deleteprofile
@method: DELETE
@access: Private
@desc: Deleting profile
*/
router.delete("/deleteprofile", auth, deleteProfile);

/*
@route: /addexperience
@method: PUT
@access: Private
@desc: Add profile experience
*/
router.put("/addexperience", auth, addProfileExperience)

/*
@route: /deleteexperience
@method: PUT
@access: Private
@desc: Delete profile experience
*/
router.delete("/deleteexperience/:id", auth, deleteProfileExperience)

/*
@route: /addeducation
@method: PUT
@access: Private
@desc: Add profile education
*/
router.put("/addeducation", auth, addProfileEducation)

/*
@route: /deleteeducation/:id
@method: DELETE
@access: Private
@desc: Delete profile education
*/
router.delete("/deleteeducation/:id", auth, deleteProfileEducation);

/*
@route: /github/:username
@method: GET
@access: Public
@desc: Get user repos from Github
*/
router.get("/github/:username", getGithubRepos);

export default router;