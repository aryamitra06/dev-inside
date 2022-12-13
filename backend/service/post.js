import express from "express";
import { addNewPost, getPosts, getPostById, deletePost, addNewComment, deleteComment, likePost, unlikePost } from "../controller/post.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

/*
@route: /newpost
@method: POST
@access: Private
@desc: Creating new post
*/
router.post("/newpost", auth, addNewPost);

/*
@route: /posts
@method: GET
@access: Private
@desc: Getting posts
*/
router.get("/posts", getPosts);

/*
@route: /post/:id
@method: GET
@access: Private
@desc: Getting post by id
*/
router.get("/post/:id", auth, getPostById);

/*
@route: /post/delete/:id
@method: DELETE
@access: Private
@desc: Deleting post by id
*/
router.delete("/post/delete/:id", auth, deletePost);

/*
@route: /comment/new/:id
@method: POST
@access: Private
@desc: Commenting on a post
*/
router.post("/comment/new/:id", auth, addNewComment);

/*
@route: /comment/delete/:post_id/:comment_id
@method: DELETE
@access: Private
@desc: Deleting a comment
*/
router.delete("/comment/delete/:post_id/:comment_id", auth, deleteComment);

/*
@route: /like/new/:id
@method: POST
@access: Private
@desc: Liking a post
*/
router.post("/like/new/:id", auth, likePost);

/*
@route: /unlike/:id
@method: POST
@access: Private
@desc: Unliking a post
*/
router.post("/unlike/:id", auth, unlikePost);

export default router;