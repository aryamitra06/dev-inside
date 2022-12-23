import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userService from "./service/user.js";
import profileService from "./service/profile.js";
import postServices from "./service/post.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors({ origin: true, credentials: true }));

/*
@desc: all routes apis
*/
app.use('/', userService);
app.use('/', profileService);
app.use('/', postServices);


const PORT = 5000;
const DB_URI = "mongodb+srv://Aryamitra:arya123@dev-inside-db.1b4g9yd.mongodb.net/db?retryWrites=true&w=majority"

mongoose.set("strictQuery", false);
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('Database connected!');
})

app.listen(PORT, ()=> {
    console.log(`Server running at port ${PORT}!`);
})