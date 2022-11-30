import express from "express";
import { auth } from "../middleware/auth.js";
import { getMyProfile } from "../controller/profile.js";
const router = express.Router();

/*
@route: /me
@method: GET
@access: Private
@desc: Getting profile details
*/
router.get("/me", auth, getMyProfile);

export default router;