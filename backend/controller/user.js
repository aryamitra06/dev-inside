import User from "../model/User.js";
import gravatar from "gravatar";
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        
        // Get users gravatar
        const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
        
        // See if user exists
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ "msg": "User already exists"});
        }

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        // Return jsonwebtoken

        //saving user
        const user = await new User({name: name, email: email, avatar: avatar, password: encryptedPassword});
        user.save();
        return res.status(200).json({ "msg": "Success" });
    } catch (error) {
        return res.status(204).json({ "msg": "Error" });
    }
}