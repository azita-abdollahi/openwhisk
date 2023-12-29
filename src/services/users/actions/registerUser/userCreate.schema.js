const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(8)
        .max(32)
        .required(),
    passwordConfirm: Joi.string()
        .valid(Joi.ref('password'))
        .required(),
});
  module.exports = registerSchema;