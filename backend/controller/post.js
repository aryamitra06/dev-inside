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

export const addNewComment = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        const post = await Post.findById(req.params.id);

        const newComment = {
            user: req.user.id,
            name: user.name,
            avatar: user.avatar,
            text: req.body.text
        };

        post.comments.unshift(newComment);
        await post.save();

        res.json(post);
    } catch (error) {
        return res.status(500).json({ msg: "Server error" });
    }
}

export const deleteComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        if(!comment){
            return res.status(404).json({msg: "Comment not found!"});
        }

        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({ msg: "User not authorized" });
        }

        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

        if (removeIndex === -1) {
            return res.json({ msg: "Comment not found" });
        }
        else{
            post.comments.splice(removeIndex, 1);
            await post.save();
            return res.json(post);
        }

    } catch (error) {
        return res.status(500).json({ msg: "Server error" });
    }
}