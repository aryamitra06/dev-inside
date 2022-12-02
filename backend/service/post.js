import express from "express";
import { addNewPost } from "../controller/post.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

/*
@route: /newpost
@method: POST
@access: Private
@desc: Creating new post
*/
router.post("/newpost", auth, addNewPost);

export default router;