/* eslint-disable linebreak-style */
import bcrypt from 'bcrypt';

/**
 * hashing password before save it to the database
 * @class CryptPswd
 *
 * */
class CryptPswd {
  /**
   * hashPass
   * @static
   * @param {*} pswdToHash
   * @return {*} x
   * @memberOf CryptPswd
   */
  static async incryptPswd(pswdToHash) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(pswdToHash, salt);
      return hash;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.stdout.write(e.message());
    }
  }

  /**
   * comparePswd
   * @static
   * @param {*} reqPswd
   * @param {*} resPswd
   * @memberOf CryptPswd
   * @return {void}
   */
  static async comparePswd(reqPswd, resPswd) {
    try {
      return await bcrypt.compare(reqPswd, resPswd);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.stdout.write(error.message());
    }
  }
}

export default CryptPswd;
