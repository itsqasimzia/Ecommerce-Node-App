const mongoose = require('mongoose')
const OrderSchema = mongoose.Schema

const orderModel = new OrderSchema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    status:String,
    orderNo:String,
    paidAmount:Number,
    totalAmount:Number,
    shippingAddress:String,
    phone:String,
    products:[
        {
            quantity:Number,
            productname:String,
            count:Number,
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'product'
            }
        }
    ]

},
{
    timestamps: true,
  }
)

module.exports = mongoose.model('order',orderModel)