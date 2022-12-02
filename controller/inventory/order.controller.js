const { addProductsByID, calculateTotalPrice } = require("../../services/productutils");
const { orderValidation } = require("../../validators/inventory/order.val");
const  { isCustomer } = require('../../services/authutils')

const randomStringGen = require('randomstring');
const { saveOrder } = require("../../model/inventory/order.model");

const createOrderRequest = async (req, res) => {

  const { shippingAddress,paidAmount,phone,orderNo,status ,products} = req.body
 
  let productsArr,calculatedTotal
  try {
    await orderValidation.validateAsync(req.body);
    await isCustomer(req.session?.userId);
     productsArr = await addProductsByID(products)
     calculatedTotal = await calculateTotalPrice(productsArr)
     if(paidAmount <  calculatedTotal) throw {status:400,message:'Amount is less then total amount you have enter'}
  } catch (error) {
    return res.status(error.status ? error.status : 422).send(error.message);
  }
 let Obj = {
   shippingAddress,
   paidAmount,
   phone,
   orderNo:randomStringGen.generate(8),
   status ,
   products:productsArr,
   total:calculatedTotal,
   userId:req.session?.userId,
}
 
  const savedOrder = await saveOrder(Obj);
  res.status(201).send('Order Created Successfullyy')
//   if (savedProduct?.status === 500 && savedProduct.error) {
//     return res.status(500).send({ error: savedProduct.error });
//   }
//   return res.status(201).send("Product Created Successfully");
};

const confirmOrderRequest = (req,res) => {
  const updatedOrder =  updateOrderDb(req.params) 
}

module.exports = { createOrderRequest,confirmOrderRequest };
