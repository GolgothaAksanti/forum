/* eslint-disable linebreak-style */
import ResponseHandler from '../helpers/responseHandler';
import JwtAuth from '../helpers/jwtHelper';
// import BlogController from './userController';
import BlogServices from '../../database/services/blogService';

/** @class BlogControllers */
class BlogControllers {
  /**
   * signup user in the database
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {object} data
   * @memberof BlogController
   */
  static async createBlog(req, res, next) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        ResponseHandler.error(res, 404, 'Access Denied!');
        return next();
      }
      const extractToken = token.split(' ')[1];
      const userId = await JwtAuth.getCurrentUserId(extractToken);
      if (!userId) {
        ResponseHandler.error(res, 404, 'Not Authorized!');
        return next();
      }
      const { title, description } = req.body;

      const blogData = {
        userId,
        title,
        description,
      };
      const createdBlog = await BlogServices.createB(blogData);
      if (!createdBlog) {
        ResponseHandler.error(res, 403, 'Data not saved, Try again ...');
      }
      // get blog ID
      const getBlogId = await BlogServices.getOneBlog(title);
      const { id, createdAt } = getBlogId;
      ResponseHandler.success(res, 201, 'blog created!', {
        id,
        userId,
        ...req.body,
        createdAt,
      });
    } catch (error) {
      ResponseHandler.error(res, 401, 'Please try again later');
    }
  }
}

export default BlogControllers;
