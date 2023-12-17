const express = require('express');
const fileController = require('../controllers/fileController.js');
const {uploadSingle, uploadArray, uploadAny} = require('../Middlewares/multerMiddleWare.js');


const fileRouter = express.Router();

fileRouter.post('/upload', uploadSingle, fileController.uploadFile);
fileRouter.get('/images', uploadSingle, fileController.getFiles);


module.exports = fileRouter;