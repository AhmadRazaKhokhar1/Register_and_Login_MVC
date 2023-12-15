const multer = require('multer')
const fs = require('fs');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = 'C:/uploads'

        cb(null, uploadPath);

        fs.mkdirSync(uploadPath, { recursive: true }); // Create directory if it doesn't exist
        cb(null, uploadPath);

      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
});

const upload = multer({
    storage:storage,
     limits:{fileSize: 10*1024*1024}  //10MB file size
    });

const uploadSingle = upload.single('file');
const uploadArray = upload.array('file');
const uploadAny = upload.any('file');

module.exports = {uploadSingle, uploadAny, uploadArray};