const Product = require('../schema/inventory/products.schemas')

const getAllProducts = async ()=> {
    const products =await Product.find({}).lean()
    return products
}
const addProductsByID = async (payload) => {
  try {
    const projIds = await Product.aggregate([
        [
            {
              '$match': {
                'productname': {
                  '$in': payload.map(i => i?.name)
                  
                }
              }
            },
            {
                '$project':{
                    _id:1,
                    productname:1 ,
                    price:1,
                }
            }
          ]
    ])
    const updatedFields =  projIds.map( (eachProd,idx) => {
        if (eachProd.productname === payload[idx][`name`]) {
            eachProd[`quantity`] = payload[idx][`quantity`]
        }
        return eachProd
    } )
    return updatedFields

  } catch (error) {
   return {status:500,error:error.message} 
  }
    
}
const calculateTotalPrice = async (products) => {
  return new Promise((resolve,rej) => {
    if (products?.length) {
        const total = products.reduce((acc,item,idx)=>{
            return acc + item.quantity * item.price
        },0)
        resolve(total)
    }
    rej({status:400,error:'No Product Added'})
  })

}
const getProductList = async () => {
   
  const keys =await Product.aggregate([
    {$group:{_id:null,item:{$push:'$productname'}}},
   
  ])
   return keys
}
const saleByProduct = () => {

  // [
  //   {
  //     '$match': {
  //       'orderNo': 'ECrLh9tv'
  //     }
  //   }, {
  //     '$unwind': {
  //       'path': '$products', 
  //       'includeArrayIndex': 'arrayIndex'
  //     }
  //   }, {
  //     '$lookup': {
  //       'from': 'products', 
  //       'localField': 'products._id', 
  //       'foreignField': '_id', 
  //       'as': 'result'
  //     }
  //   }
  // ]
  const pendingOrders =   Product.find({})
  return pendingOrders
}

module.exports ={ addProductsByID ,calculateTotalPrice,getAllProducts,getProductList}