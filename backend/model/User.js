import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    //_id = req.user.id
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    gender: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("user", userSchema);

export default User;