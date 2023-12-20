import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config();
import fs from 'fs'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET, 
  });

  const uploadOnCloudinary = async(localFilePath)=>{
    try {
      if(!localFilePath){ return null}

     const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type:'auto'
      })
      console.log(`file has been uploaded successfully: ${response.url}`);
      //return the response to client
      setTimeout(function(){ fs.unlinkSync(localFilePath);},7000)
      return response.url;

    } catch (error) {
      console.log(`Cloudinary Error:`,error)
      fs.unlinkSync(localFilePath);
      return null;
    }
  }

  export default uploadOnCloudinary;