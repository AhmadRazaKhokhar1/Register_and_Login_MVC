import bcrypt from 'bcryptjs'
import userClient from '../Database/dataBase.js'
import userModel from '../models/userModel.js'
import uploadOnCloudinary from '../Utils/cloudinary.js'

const userController = {
//registration mehtod 
registration :async(req, res)=>{
    try {
       await userClient.connect();
       const userExists = await userModel.findOne({email:req.body.email});

       if(userExists){
         res.status(409).json({message:'User already exists!'});
         return;
         }
         
        // requesting files and their paths
       const profileImageLocal = req.files?.profileImage[0]?.path;
       const coverImageLocal = req.files?.coverImage[0]?.path;

       //uploading on cloudinary
        const profileImage = await uploadOnCloudinary(profileImageLocal);
        const coverImage = await uploadOnCloudinary(coverImageLocal);
   
         if(!profileImage){
            res.status(400).send({
                success:false,
                message:"Profile image is required"
            })
        }

            const newData = new userModel({
                
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                phone:req.body.phone,
                password:req.body.password,
                profileImage:profileImage.url,  
                coverImage: coverImage?.url || "",
                
            });
       const result = await newData.save()
       console.log('Success');
       return res.status(201).json({message:'User registered successfully!', result:result});
    } catch (error) {
        console.log(`There was an error in Registeration: ${error}`);
       return res.status(500).json({error:'There was an internal server ERROR: 500'});
    } finally{
        await userClient.close();
    }
},
//login mehtod or POST method 
login : async (req, res)=>{
    try {
        await userClient.connect();
        console.log(`The app is connected to the DataBase 🔥`)

        const userExists = await userModel.findOne({email:req.body.email});
         if (userExists){
         const passConfirm = await bcrypt.compare(req.body.password, userExists.password);
            if(passConfirm){
            const token = await userExists.generateToken();

            res.status(200).json({
                message:"User logged in successfully!",
                 token:token, id:userExists._id,
                  userData: userExists
                });
              
            }
            else{
                res.status(401).json({msg:"Invalid Credentials"})
            }
        }
         if(!userExists){
             res.status(401).json({message:"Invalid credentials"})
            }
    } catch (error) {
        console.log(`There was an error while logging in! : ${error}`);
        res.status(500).json({error:'There was an internal serverERROR:500'});
    } 
    finally{
        await userClient.close();
    }
},
    //fetch data mehtod or GET method 
 data: async(req, res)=>{
    try {
        await userClient.connect();
        const dataFetched = await userModel.find({});
        res.status(200).json({dataFetched:dataFetched});
    } catch (error) {
        console.log(`There was an error in Fetching Data: ${error}`);
        res.status(500).json({error:'There was an internal server <b>ERROR: 500</b>'});
    } finally{
        userClient.close();
    }
  },
  // search single user by his unique id by using params
  getUser:async(req, res)=>{
     try {
        await userClient.connect();
        const userDataAccess = req.user;
        const userId = userDataAccess._id;
    
        res.status(302).json({ userDataAccess:userDataAccess})
     } catch (error) {
        console.log(`There was as an internal server error ${error}`);
        res.status(500).json({error:"Internal Server Error"})
     }
  },
  // update user by his id and $set to change his info || Put or Patch and even Post Method can be used but PUT is preferred
  updateUser:async(req, res)=>{
    try {
        await userClient.connect();
        const userId = req.params.id;
        const updatedUserData = req.body;
        const userData = await userModel.findOneAndUpdate({_id:userId}, {$set:updatedUserData}, {new:true});
        if(!updatedUserData){
            res.status(404).json({message:"User not found!"});
        }
        else{
            res.status(302).json({error:"Updated successfully", userData})
        }
    } catch (error) {
        console.log(`There is an error at ${error}`);
        res.status(500).json({error:"Internal Server Error"});
    }
},
// delete user by targeting his unique id and DELETE Method
deleteUser:async(req, res)=>{
    try {
        await userClient.connect();
        const userId = req.params.id;
        const userDeleted = await userModel.findOneAndDelete({_id:userId});
        if(userDeleted){
            res.status(200).json({message:"User Deleted successfully!", userDeleted:userDeleted})
        }else{
            res.status(404).json({error:"User not found!"});
        }
    }catch(error){
        console.log('There was an error:'+ error);
        res.status(500).json({error:"There was an internal server error."})
    }
  }

}

export default userController;