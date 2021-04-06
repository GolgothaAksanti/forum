import db from '../models';
/**
 * @class UserServices
 */
class UserServices {
  /**
   * createUser
   * @static
   * @param {*} userData
   * @returns {*} userCreated
   * @memberof UserServices
   */
  static async createUser(userData) {
    const result = await db.User.create(userData);
    return result;
  }

  // /**
  //  * existEmail
  //  * @static
  //  * @param {*} reqEmail
  //  * @returns {bolean} true
  //  * @memberof UserServices
  //  */
  // static async existEmail(reqEmail) {
  //   const result = await db.User.findOne({ where: { email: reqEmail } });
  //   return result;
  // }

  /**
   * existUser
   * @static
   * @param {*} email
   * @param {*} username
   * @returns {bolean} true
   * @memberof UserServices
   */
  static async userExist(email, username) {
    const result = await db.User.findOne({ where: { email, username } });
    return result;
  }

  // /**
  //  * existUser
  //  * @static
  //  * @param {*} reqUser
  //  * @returns {bolean} true
  //  * @memberof UserServices
  //  */
  // static async existUser(reqUser) {
  //   const result = await db.User.findOne({ where: { username: reqUser } });
  //   return result;
  // }

  /**
   * existUser
   * @static
   * @param {*} reqUser
   * @returns {*} data
   * @memberof UserServices
   */
  static async getExistId(reqUser) {
    const result = await db.User.findOne({ where: { username: reqUser } });
    return result;
  }

  /**
   * signInUser
   * @static
   * @param {*} user
   * @returns {bolean} true
   * @memberof UserServices
   */
  static async signInUser(user) {
    const result = await db.User.findOne({ where: { username: user } });
    return result;
  }
}

export default UserServices;
