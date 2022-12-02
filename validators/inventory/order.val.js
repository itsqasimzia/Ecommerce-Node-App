const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const orderValidation = Joi.object().keys({
    shippingAddress: Joi.string().min(4).max(15).required(),
    paidAmount: Joi.number().min(1).required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    orderNo: Joi.string().min(1).required(),
    total: Joi.number(),
    status:Joi.string().required().valid('pending','delivered','cenceled','completed').default('pending'),
    userId:Joi.objectId(),
    products:Joi.array().items(Joi.object().keys({
        quantity:Joi.number().min(1).required(),
        name:Joi.string().min(1).required(),
        productId:Joi.objectId(),
    })).required()
  });


  module.exports = {orderValidation}