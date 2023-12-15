const fileModel =require("../models/multerModel.js");
const fs = require('fs');
const path = require('path')
const fileController = {

   uploadFile:async(req, res)=> {
    try {
        const newFile = new fileModel({
            name:req.file.originalname,
            data: fs.readFileSync(req.file.path),
        });

        await newFile.save();
        res.status(200).send({
            message:"Uploaded file successfully!"
        });

        // Remove the file from the local storage folder
      const clearCache = ()=>{
        setTimeout(() => {
            const filePath = path.join('C:/uploads', req.file.filename);
            fs.unlinkSync(filePath);
        }, 10000);
        console.log(`The file is uploaded to DB and deleted from the root directory`)
      }
      clearCache();

    } catch (error) {
        console.log(`There was an Error handling file controller: ${error}`);
        res.status(500).send({
            message:"There was an internal server Error"
        })
    }
   }
}

module.exports = fileController;