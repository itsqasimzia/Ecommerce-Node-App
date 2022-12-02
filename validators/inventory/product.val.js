const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const productValidation = Joi.object().keys({
  productname: Joi.string().min(4).max(15).required(),
  price: Joi.number().min(1).required(),
  quantity: Joi.number().min(1).required(),
  manufacturer: Joi.string().min(1).required(),
  image: Joi.string().min(1).required(),
  color: Joi.string().min(1).required(),
  expirydate: Joi.date().required().greater(Date.now()),
  categoryId: Joi.objectId(),
  userId:Joi.objectId()
});

module.exports = {
  productValidation,
};
