const Order = require('../../schema/inventory/order.schema')
const saveOrder = (payload) => {
    console.log(payload);
   try {
    const order = new Order(payload)
    return order.save()
   } catch (error) {
    return {status:500,message:error.message}
   }
}

module.exports = {
    saveOrder
}