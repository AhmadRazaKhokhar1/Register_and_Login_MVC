const fileModel =require("../models/multerModel.js");

const fileController = {

   uploadFile:async(req, res)=> {
    try {
        const newFile = new fileModel({
            name:req.file.originalname,
            data:req.file.buffer,
        });
        await newFile.save();
        res.status(200).send({
            message:"Uploaded file successfully!"
        })
    } catch (error) {
        console.log(`There was an Error handling file controller: ${error}`);
        res.status(500).send({
            message:"There was an internal server Error"
        })
    }
   }
}

module.exports = fileController;