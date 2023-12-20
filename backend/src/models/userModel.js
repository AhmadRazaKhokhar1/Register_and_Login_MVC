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
        type:Buffer,
        require:true,
    },
    coverImage:{
        type:Buffer,
        require:false,
    },
 });

 userSchema.methods.generateToken = async ()=>{
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
const userModel = new mongoose.model('Users_demo_data_for_testing', userSchema);
export default userModel;