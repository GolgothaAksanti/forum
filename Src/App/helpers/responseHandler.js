/**
 * @class ResponseHandler
 */
class ResponseHandler {
  /**
   * success.
   * @static
   * @param {*} res
   * @param {*} code
   * @param {*} message
   * @param {*} data
   * @returns {object} data
   * @memberof ResponseHandler
   */
  static success(res, code, message, data) {
    return res.status(code).json({
      status: code,
      message,
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
      message,
    });
  }
}

export default ResponseHandler;
