import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
  destination:(req, file, cb)=>{
    const uploadPath = '../../Public/images';
    cb(null, uploadPath);
    //if the folder does'nt exist then make it
    fs.mkdirSync(uploadPath, {recursive:true});
    cb(null, uploadPath);
  },
  filename:(req, file, cb)=>{
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage:storage,
  limits:{
    fileSize:100*1024*1024
  }
});

const uploadFields = upload.fields(
  [{name:"profileImage", maxCount:1},{name:"coverImage", maxCount:1}]
  )

export {uploadFields};