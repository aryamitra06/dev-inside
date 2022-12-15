import User from "../model/User.js";
import gravatar from "gravatar";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {

        const { name, email, password, gender } = req.body;

        // Get users gravatar
        // const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
        const avatar = `https://avatars.dicebear.com/api/${gender}/${name}.svg`;

        // See if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        //saving user
        const user = await new User({ name: name, email: email, gender: gender, avatar: avatar, password: encryptedPassword });
        user.save();

        // Return jsonwebtoken
        const token = jwt.sign({ user: { id: user._id, name: user.name, avatar: user.avatar} }, "meawmeaw", { expiresIn: "7d" });
        return res.status(200).json({ msg: "Success", token: token });

    } catch (error) {
        return res.status(204).json({ msg: "Error" });
    }
}

export const loginUser = async (req, res) => {
    try {
        
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        // Return jsonwebtoken
        const token = jwt.sign({ user: { id: user._id, name: user.name, avatar: user.avatar} }, "meawmeaw", { expiresIn: "7d" });
        return res.status(200).json({ msg: "Success", token: token });

    } catch (error) {
        return res.status(204).json({ msg: "Error" });
    }
}

export const getProfileInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        return res.json(user);
    } catch (error) {
        res.status(404).json({ msg: "Server issue" });
    }
}