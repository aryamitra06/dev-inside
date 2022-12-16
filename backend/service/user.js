import express from "express";
import { registerUser, loginUser } from "../controller/user.js";
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

export default router;