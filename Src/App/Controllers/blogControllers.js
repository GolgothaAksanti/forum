/* eslint-disable linebreak-style */
import ResponseHandler from '../helpers/responseHandler';
import ExtractToken from '../helpers/extractToken';
import BlogServices from '../../database/services/blogService';

/** @class BlogControllers */
class BlogControllers {
  /**
   * createBlog create a new blog and store it in the database
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {object} data
   * @memberof BlogController
   */
  static async createBlog(req, res, next) {
    try {
      // get userId fom the token
      const userId = await ExtractToken.extractAccessToken(req, res, next);

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
      const userId = await ExtractToken.extractAccessToken(req, res, next);

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

  /**
   * getSingleBlog in the database by userId
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {object} data
   * @memberof BlogController
   */
  static async getSingleBlog(req, res, next) {
    try {
      // get the userId from the token
      // const userId = await ExtractToken.extractAccessToken(req, res, next);

      // Get a blog Id from the parameters
      const blogId = req.params.post_id;

      const result = await BlogServices.getSingleB(blogId);

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

  /**
   * getSingleBlog in the database by userId
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {object} data
   * @memberof BlogController
   */
  static async updateBlog(req, res, next) {
    try {
      // get the userId from the token
      const userId = await ExtractToken.extractAccessToken(req, res, next);

      // Get a blog Id from the parameters
      const blogId = req.params.post_id;

      const { title, description } = req.body;

      const data = {
        title,
        description,
      };
      // update a blog
      const result = await BlogServices.updateB(data, blogId);

      if (!result) {
        ResponseHandler.error(res, 400, 'Not found!');
        return next();
      }
      // get the updated blog
      const result1 = await BlogServices.getSingleB(blogId);

      // remove createdAt property
      const { updatedAt } = result1;

      // return the response to the client
      ResponseHandler.success(res, 200, 'Updated successfully', {
        blogId,
        userId,
        ...req.body,
        updatedAt,
      });
    } catch (error) {
      ResponseHandler.error(res, 400, error.message);
    }
  }

  /**
   * deleteBlog in the database by userId
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {object} data
   * @memberof BlogController
   */
  static async deleteBlog(req, res, next) {
    try {
      // get the userId from the token
      const userId = await ExtractToken.extractAccessToken(req, res, next);

      // Get a blog Id from the parameters
      const blogId = req.params.post_id;

      // get data before deleted
      // get the updated blog
      const result1 = await BlogServices.getSingleB(blogId);

      const { title, description } = result1;
      const data = {
        title,
        description,
      };

      const result = await BlogServices.deleteB(blogId);

      if (!result) {
        ResponseHandler.error(res, 400, 'Not found!');
        return next();
      }

      // if there is no any blog registered with this userId
      if (result === null) {
        ResponseHandler.error(res, 400, 'error');
      }

      // return the response to the client
      ResponseHandler.success(res, 200, '', { blogId, userId, ...data });
    } catch (error) {
      ResponseHandler.error(res, 400, error.message);
    }
  }
}

export default BlogControllers;
