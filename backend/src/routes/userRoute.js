import express from 'express'
import userController from '../controllers/userController.js';
import { uploadFields } from '../Middlewares/multerMiddleWare.js';
import jwtVerified from '../Middlewares/authMiddleWare.js';

const userRouter = express.Router();

userRouter.post('/register', uploadFields, userController.registration);
userRouter.post('/login', userController.login);
userRouter.get('/data', userController.data);
userRouter.get('/userdata/:id',jwtVerified , userController.getUser);
userRouter.put('/userdata/:id',jwtVerified, userController.updateUser);
userRouter.delete('/userdata/:id',jwtVerified, userController.deleteUser);

export default userRouter;