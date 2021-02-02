/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/**
 * @class ResponseHandler
 */
class ResponseHandler {
  /**
   * success.
   * @static
   * @param {*} res
   * @param {*} code
   * @param {*} data
   * @param {*} next
   * @returns {object} data
   * @memberof ResponseHandler
   */
  static success(res, code, data, next) {
    return res.status(code).json({
      status: code,
      data,
    });
  }

  /**
   * error.
   * @static
   * @param {*} res
   * @param {*} status
   * @param {*} message
   * @returns {object} error
   * @memberof ResponseHandler
   */
  static error(res, status, message) {
    return res.status(status).json({
      status,
      message,
    });
  }

  /**
   * ok
   * @static
   * @param {*} res
   * @param {*} code
   * @param {*} message
   * @returns {object} error
   * @memberof ResponseHandler
   */
  static ok(res, code, message) {
    return res.status(code).json({
      status: code,
      message
    });
  }
}

export default ResponseHandler;
