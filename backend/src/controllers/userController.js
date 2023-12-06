const { useFormAction } = require('react-router-dom');
const userClient = require('../Database/dataBase.js');
const userModel = require('../models/userModel.js');

const userController = {
//registration mehtod or POST method 
registration :async(req, res)=>{
    try {
       await userClient.connect();
       const userExists = await userModel.findOne({email:req.body.email});

       if(userExists){
       return res.status(409).json({message:'User already exists!'});
         }
       
       const newData = new userModel({

        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password,

       });

       const result = await newData.save()
       res.status(201).json({message:'User registered successfully!', result:result});
        console.log('Success');
    } catch (error) {
        console.log(`There was an error in Registeration: ${error}`);
        res.status(500).json({message:'There was an internal server <b>ERROR: 500</b>'});
    } finally{
        await userClient.close();
    }
},
//login mehtod or POST method 
login :async(req, res)=>{
    try {
        await userClient.connect();
        console.log(`The app is connected to the DataBase 🔥`)

        const userExists = await userModel.findOne({email:req.body.email});

        const password = req.body.password;
        if(userExists && password == userExists.password){
            res.status(200).json({message:'User logged in successfully!'});
        }else{
            res.status(401).json({message:'Invalid credentials!', userDetails:userExists});

        }

    } catch (error) {
        console.log(`There was an error while logging in! : ${error}`);
        res.status(500).json({message:'There was an internal server <b>ERROR: 500</b>'});
    } finally{
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
        res.status(500).json({message:'There was an internal server <b>ERROR: 500</b>'});
    } finally{
        userClient.close();
    }
  },
  // search single user by his unique id by using params
  getUser:async(req, res)=>{
     try {
        await userClient.connect();
        const userId = req.params.id
    
        const userData = await userModel.findOne({_id:userId});
        res.status(302).json({userData:userData})
     } catch (error) {
        console.log(`There was as an internal server error ${error}`);
        res.status(500).json({message:"Internal Server Error"})
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
            res.status(302).json({message:"Updated successfully", userData})
        }
    } catch (error) {
        console.log(`There is an error at ${error}`);
        res.status(500).json({message:"Internal Server Error"});
    }
},
// delete user by targeting his unique id and DELETE Method
deleteUser:async(req, res)=>{
    try {
        await userClient.connect();
        const userId = req.params.id;
        const userDeleted = await userModel.findOneAndDelete({_id:userId});
        if(userDeleted){
            res.status(204).json({message:"User Deleted successfully!", userDeleted:userDeleted})
        }else{
            res.status(404).json({message:"User not found!"});
        }
    }catch(error){
        console.log('There was an error:'+ error);
        res.status(500).json({message:"There was an internal server error."})
    }
  }

}

module.exports = userController;