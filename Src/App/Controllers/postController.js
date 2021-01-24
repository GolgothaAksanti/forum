/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const createPost = (req, res) => {
  console.log(req.body);
  res.send('recieved');
};

export default createPost;
