import express from "express";

const router = express.Router();

/*
@route: /users
@method: GET
@access: Public
@desc: fetching public users
*/
router.get("/users", (req, res) => {
    res.send("Getting all users...")
})

export default router;