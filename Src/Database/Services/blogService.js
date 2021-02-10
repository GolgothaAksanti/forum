/* eslint-disable linebreak-style */
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
   * @param {*}id
   * @return {*}data
   * @memberOf BlogServices
   */
  static async getAllP(id) {
    const res = await db.Blog.findAll({ where: { userId: id } });
    return res;
  }

  /**
   * getOneBlo
   * @static
   * @param {*}reqTitle
   * @return {*} data
   * @memberOf BlogServices
   */
  static async getOneBlog(reqTitle) {
    const res = await db.Blog.findOne({ where: { title: reqTitle } });
    return res;
  }

  /**
   * DeleteP
   * @static
   * @param {*}reqId
   * @param {*}newData
   * @return {*} data
   * @memberOf BlogServices
   */
  static async deleteP(reqId) {
    const res = await db.Blog.destroy({ where: { id: reqId } });
    return res;
  }
}

export default BlogServices;
