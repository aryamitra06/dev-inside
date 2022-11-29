import express from "express";
import { registerUser, getProfileInfo } from "../controller/user.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

/*
@route: /register
@method: POST
@access: Public
@desc: Register a new user
*/
router.post("/register", registerUser);

/*
@route: /myprofile
@method: GET
@access: Private
@header: x-auth-token
@desc: Fetching details of loggedin user
*/
router.get("/myprofile", auth, getProfileInfo)

export default router;