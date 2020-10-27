const Joi = require("joi");

//Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required().alphanum(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required(),
    email: Joi.string().min(6).required().email(),
  });

  //Validation
  return schema.validate(data);
};

//Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required().alphanum(),
    password: Joi.string().min(6).required(),
  });

  //Validation
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
