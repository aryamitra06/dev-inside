import Post from "../model/Post.js";
import Profile from "../model/Profile.js";
import User from "../model/User.js";

export const addNewPost = async(req,res) => {
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
        res.status(500).json({msg: "Server error"});
    }
}