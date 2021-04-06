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
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pswdToHash, salt);
    return hash;
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
    const psd = await bcrypt.compare(reqPswd, resPswd);
    return psd;
  }
}

export default CryptPswd;
