import Post from "../model/Post.js";
import Profile from "../model/Profile.js";
import User from "../model/User.js";

export const addNewPost = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            user: req.user.id,
            text: req.body.text,
            name: user.name,
            avatar: user.avatar
        });

        const post = await newPost.save();
        res.json(post);

    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
}

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
}

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ msg: "No post found" });
        return res.json(post);
    } catch (error) {
        if (error.kind === "ObjectId") return res.status(404).json({ msg: "No post found" });
        return res.status(500).json({ msg: "Server error" });
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" });
        }
        await post.remove();
        return res.json({ msg: "Post removed" });
    } catch (error) {
        if (error.kind === "ObjectId") return res.status(404).json({ msg: "No post found" });
        return res.status(500).json({ msg: "Server error" });
    }
}