/* eslint-disable no-unused-vars */
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
    const userId = await ExtractToken.extractAccessToken(req, res, next);
    const { title, description } = req.body;

    const blogData = {
      userId,
      title,
      description,
    };

    const blog = await BlogServices.getOneBlogByTD(title, description);

    if (blog) {
      ResponseHandler.error(res, 409, 'Already exist');
      return next();
    }

    const createdBlog = await BlogServices.createB(blogData);

    delete createdBlog.updatedAt;

    ResponseHandler.success(res, 201, 'blog created!', createdBlog);
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
    const userId = await ExtractToken.extractAccessToken(req, res, next);

    const result = await BlogServices.getAllP(userId);

    ResponseHandler.success(res, 200, 'Success', result);
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
    const userId = await ExtractToken.extractAccessToken(req, res, next);

    const blogId = req.params.post_id;

    const result = await BlogServices.getSingleB(blogId);

    if (!result) {
      ResponseHandler.error(res, 404, 'Not found!');
      return next();
    }

    ResponseHandler.success(res, 200, 'ok', result);
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
    const userId = await ExtractToken.extractAccessToken(req, res, next);

    const blogId = req.params.post_id;

    const { title, description } = req.body;

    const data = {
      title,
      description,
    };

    const blogExist = await BlogServices.getSingleB(blogId);

    if (!blogExist) {
      ResponseHandler.error(res, 404, 'Not Found!');
    }

    const result = await BlogServices.updateB(data, blogId, userId);

    const result1 = await BlogServices.getOneBlog(title);

    const { updatedAt } = result1;

    ResponseHandler.success(res, 200, 'Updated successfully', {
      blogId,
      userId,
      ...req.body,
      updatedAt,
    });
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
    const userId = await ExtractToken.extractAccessToken(req, res, next);

    const blogId = req.params.post_id;

    const result1 = await BlogServices.getSingleB(blogId);

    const result = await BlogServices.deleteB(blogId, userId);

    if (!result) {
      ResponseHandler.error(res, 404, 'Not found!');
      return next();
    }

    ResponseHandler.success(res, 200, 'Deleted');
  }
}

export default BlogControllers;
