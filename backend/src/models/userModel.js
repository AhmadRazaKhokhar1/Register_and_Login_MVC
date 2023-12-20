import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
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
        unique:true,
        
    },
    phone:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    profileImage:{
        type:String,
    },
    coverImage:{
        type:String,
    },
 });

 userSchema.methods.generateToken = async function(){
   const token =  await jwt.sign({
        email: this.email,
        id : this._id,
        phone : this.phone,
    },
    process.env.SECRET_KEY,
    {
        expiresIn: '30d'
    }
    )
   
    return token;
}

userSchema.pre('save', async function(){
 
    const hashedPass = await bcrypt.hash(this.password, 14);
    this.password = hashedPass;
   
})
const userModel = new mongoose.model('cloudinary_data', userSchema);
export default userModel;