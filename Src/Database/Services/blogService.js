import db from '../models';
/** @class  */
class BlogServices {
  /**
   * createP
   * @static
   * @param {*}data
   * @return {*} data
   * @memberOf BlogServices
   */
  static async createB(data) {
    const res = await db.Blog.create(data);
    return res;
  }

  /**
   * getAllP
   * @static
   * @param {*} id
   * @return {*} data
   * @memberOf BlogServices
   */
  static async getAllP(id) {
    const res = await db.Blog.findAll({ where: { userId: id } });
    return res;
  }

  /**
   * getOneBlo get one by title
   * @static
   * @param {*}title
   * @return {*} data
   * @memberOf BlogServices
   */
  static async getOneBlog(title) {
    const res = await db.Blog.findOne({ where: { title } });
    return res;
  }

  /**
   * getOneBlogByTD get one by title and description
   * @static
   * @param {*} title
   * @param {*} description
   * @return {*} data
   * @memberOf BlogServices
   */
  static async getOneBlogByTD(title, description) {
    const res = await db.Blog.findOne({ where: { title, description } });
    return res;
  }

  /**
   * getSingleB for getting a single blog by its id from the params
   * @static
   * @param {*} id
   * @return {*} data
   * @memberOf BlogServices
   */
  static async getSingleB(id) {
    const res = await db.Blog.findOne({ where: { id } });
    return res;
  }

  /**
   * updateB for updating a single blog
   * @static
   * @param {*} data
   * @param {*} id
   * @param {*} userId
   * @return {*} data
   * @memberOf BlogServices
   */
  static async updateB(data, id, userId) {
    const res = await db.Blog.update(data, { where: { id, userId } });
    return res;
  }

  /**
   * DeleteP
   * @static
   * @param {*} id
   * @param {*} userId
   * @return {*} data
   * @memberOf BlogServices
   */
  static async deleteB(id, userId) {
    const res = await db.Blog.destroy({ where: { id, userId } });
    return res;
  }
}

export default BlogServices;
