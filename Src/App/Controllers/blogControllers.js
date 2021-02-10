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

  /**
   * getAllBlog in the database by userId
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {object} data
   * @memberof BlogController
   */
  static async getAllBlog(req, res, next) {
    try {
      // get the userId from the token
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

      const result = await BlogServices.getAllP(userId);

      if (!result) {
        ResponseHandler.error(res, 400, 'Not found!');
        return next();
      }
      // if there is no any blog registered with this userId
      if (result === null) {
        ResponseHandler.error(res, 400, 'You have no blog yet');
      } else {
        // return the response to the client
        ResponseHandler.success(res, 200, '', { result });
      }
    } catch (error) {
      ResponseHandler.error(res, 400, error.message);
    }
  }
}

export default BlogControllers;
