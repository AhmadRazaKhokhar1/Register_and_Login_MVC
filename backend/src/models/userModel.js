const mongoose =require('mongoose');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.MONGO_URI_TEST;
mongoose.connect(uri);

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        trim:true
    },
    lastName:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    phone:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }

 });

const userModel = new mongoose.model('Users_demo_data_for_testing', userSchema);

module.exports = userModel;