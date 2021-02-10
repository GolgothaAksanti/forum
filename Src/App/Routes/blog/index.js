/* eslint-disable linebreak-style */
import { Router } from 'express';
import BlogController from '../../controllers/blogControllers';
import Validator from '../../middlewares/validator';

const blogRoutes = Router();

blogRoutes.post('/blog/posts', Validator.createBog, BlogController.createBlog);
blogRoutes.get('/blog/posts', BlogController.getAllBlog);
blogRoutes.get('/blog/posts/:post_id', BlogController.getSingleBlog);

export default blogRoutes;
