const Orders  = require('../schema/inventory/order.schema')

const getAllPendingOrders = () => {
    const pendingOrders =  Orders.find({status:{$ne:'completed'}}).populate('userId')
    return pendingOrders
}


const updateOrderStatus = async(orderNo,status) => {
    const updateStatus =  await Orders.findOneAndUpdate({orderNo},{$set:{status:status}}, {new: true}).lean()
    return updateStatus
}
const getSaleByColor = async(orderNo,status) => {
    const updateStatus =  await Orders.aggregate([
        {
          '$match': {
            'status': 'completed'
          }
        }, {
          '$unwind': {
            'path': '$products'
          }
        }, {
          '$project': {
            'paidAmount': 1, 
            'productname': '$products.productname', 
            'sale': '$products.count', 
            'productId': '$products._id'
          }
        }, {
          '$lookup': {
            'from': 'products', 
            'localField': 'productId', 
            'foreignField': '_id', 
            'as': 'result'
          }
        }, 
        {
          '$group': {
              '_id': '$productname', 
              "quantity":{$sum : '$sale'},
              "color":{ $min :'$result.color'}
            
          },
        },
        {
          '$group': {
              '_id': null, 
              "maxvalue":{$max : '$quantity'}, 
              "color":{ $min :'$color'},
              "productname":{ $min :'$_id'},
          },
          
        },
      ])
    return updateStatus
}

module.exports = { getAllPendingOrders,updateOrderStatus,getSaleByColor }