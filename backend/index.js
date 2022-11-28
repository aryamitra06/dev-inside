import express from 'express';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import usersService from "./service/users.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));

/*
@desc: all routes apis
*/
app.use('/', usersService);

const PORT = 5000;
const DB_URI = "mongodb+srv://Aryamitra:arya123@dev-inside-db.1b4g9yd.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('Database connected!');
})

app.listen(PORT, ()=> {
    console.log(`Server running at port ${PORT}!`);
})