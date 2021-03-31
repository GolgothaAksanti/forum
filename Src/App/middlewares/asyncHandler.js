/* eslint-disable linebreak-style */

const asyncHandler = (cb) => async (req, res, next) => {
  try {
    await cb(req, res, next);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
  return true;
};

export default asyncHandler;
