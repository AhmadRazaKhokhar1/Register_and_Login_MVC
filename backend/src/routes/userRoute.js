import express from 'express'
import userController from '../controllers/userController.js';
import { uploadFields } from '../Middlewares/multerMiddleWare.js';

const userRouter = express.Router();

userRouter.post('/register', uploadFields, userController.registration);
userRouter.post('/login', userController.login);
userRouter.get('/data', userController.data);
userRouter.get('/userdata/:id', userController.getUser);
userRouter.put('/updateuser/:id', userController.updateUser);
userRouter.delete('/deleteuser/:id', userController.deleteUser);

export default userRouter;