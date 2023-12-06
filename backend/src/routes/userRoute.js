const express = require('express');
const userController = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post('/register', userController.registration)
userRouter.post('/login', userController.login)
userRouter.get('/data', userController.data);
userRouter.get('/userdata/:id', userController.getUser);
userRouter.put('/updateuser/:id', userController.updateUser);
userRouter.delete('/deleteuser/:id', userController.deleteUser);

module.exports = userRouter;