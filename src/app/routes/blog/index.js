import { Router } from 'express';
import BlogController from '../../controllers/blogControllers';
import Validator from '../../middlewares/validator';
import asyncHandler from '../../middlewares/asyncHandler';

const blogRoutes = Router();

blogRoutes.post(
  '/blog/posts',
  Validator.createBog,
  asyncHandler(BlogController.createBlog),
);

blogRoutes.get('/blog/posts',
  asyncHandler(BlogController.getAllBlog));

blogRoutes.get(
  '/blog/posts/:post_id',
  asyncHandler(BlogController.getSingleBlog),
);
blogRoutes.put(
  '/blog/posts/:post_id',
  Validator.createBog,
  asyncHandler(BlogController.updateBlog),
);
blogRoutes.delete(
  '/blog/posts/:post_id',
  asyncHandler(BlogController.deleteBlog),
);

export default blogRoutes;
