const express = require('express');
const fileController = require('../controllers/fileController.js');
const {uploadSingle} = require('../Middlewares/multerMiddleWare.js');


const fileRouter = express.Router();

fileRouter.post('/upload', uploadSingle, fileController.uploadFile);

module.exports = fileRouter;