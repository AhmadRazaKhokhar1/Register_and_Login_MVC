import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
const jwtVerified =async (req, res, next)=>{
const token = req.header('Authorization');

    try {
        if(!token){
            return res.status(401).send({
                success:false, message:"Your login session has expired please login"
            })
        }
        const jwtToken = token.replace('Bearer', "").trim()

       const isVerifiedUser = jwt.verify(jwtToken, process.env.SECRET_KEY);
       const userData = await userModel.findOne({email:isVerifiedUser.email}).select({password:0}); // deselect the password

       req.user = userData;
       req.token = token;
       req.userId = userData._id;
        next()
        
    } catch (error) {
        console.log(`Error in jwtVerified middleware: ${error}`)
        return res.status(401).send({
            success:false,
            message:"Internal Server Error"
        })
    }
}
export default jwtVerified;