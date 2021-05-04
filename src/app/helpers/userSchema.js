import joi from 'joi';

const schema = {
  signup: joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
  }),

  signin: joi.object({
    username: joi.string().required(),
    password: joi.string().required(),
  }),

  createBlog: joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
  }),
};

export default schema;
