import express from "express";
import { registerUser } from "../controller/user.js";

const router = express.Router();

/*
@route: /register
@method: GET
@access: Public
@desc: Register a new user
*/
router.post("/register", registerUser);

export default router;