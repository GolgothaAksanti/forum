import { Router } from 'express';
import UserController from '../../controllers/userController';
import Validator from '../../middlewares/validator';
import asyncHandler from '../../middlewares/asyncHandler';

const userRoutes = Router();

userRoutes.post(
  '/auth/signup',
  Validator.signup,
  asyncHandler(UserController.signup),
);
userRoutes.post(
  '/auth/signin',
  Validator.signin,
  asyncHandler(UserController.signin),
);

export default userRoutes;
