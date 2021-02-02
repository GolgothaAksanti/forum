/* eslint-disable linebreak-style */
import { Router } from 'express';
import UserController from '../../controllers/userController';
import Validator from '../../middlewares/validator';

const userRoutes = Router();

userRoutes.post('/auth/signup', Validator.signup, UserController.signup);

export default userRoutes;
