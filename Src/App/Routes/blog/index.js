/* eslint-disable linebreak-style */
import { Router } from 'express';
import BlogController from '../../controllers/blogControllers';
import Validator from '../../middlewares/validator';

const blogRoutes = Router();

blogRoutes.post('/blog/posts', Validator.createBog, BlogController.createBlog);
// userRoutes.post('/auth/signin', Validator.signin, UserController.signin);

export default blogRoutes;
