const Joi = require("joi");

const categoryValidation = Joi.object().keys({
  categoryname: Joi.string().min(4).max(15).required(),
  isActive: Joi.boolean().required(),
});
//  if (result.error) {
//    return res.status(422).json({
//      errorCause: result.error.name,
//      missingParams: result.error.details[0].path,
//      message: result.error.details[0].message,
//    });
//  }
module.exports = {
  categoryValidation,
};

// .messages({
//       'string.base': `"a" should be a type of 'text'`,
//       'string.empty': `"a" cannot be an empty field`,
//       'string.min': `"a" should have a minimum length of {#limit}`,
//       'any.required': `"a" is a required field`
//     })
