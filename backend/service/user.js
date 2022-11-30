import express from "express";
import { registerUser, loginUser, getProfileInfo } from "../controller/user.js";
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
@route: /login
@method: POST
@access: Public
@desc: Login existing user
*/
router.post("/login", loginUser);

/*
@route: /user
@method: GET
@access: Private
@header: x-auth-token
@desc: Fetching details of loggedin user
*/
router.get("/user", auth, getProfileInfo)

export default router;