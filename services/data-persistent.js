const { log } = require('console')
const fs = require('fs')
const { resolve } = require('path')
const path = require('path')
const dir = path.join(__dirname,'../assets/jsonfiles/cart.json')


const persistCartStorage = (data) => {
 
    let message = ''
    if (!fs.existsSync(dir)) {
        fs.writeFileSync(dir,'')
    }
    const cartlist = getCartData()
    const cartdata = [...cartlist,data]
   fs.writeFileSync(dir,JSON.stringify(cartdata),(err)=>{
      if (err) {
          message ='Failed to add'
        throw new Error('Failed to add')

      }
      message ='Data Added Successfully'
})
   return message
}
const getCartData =  () => {

    if (!fs.existsSync(dir))  return 'No Data Found'
    const data = fs.readFileSync(dir)
    return data.length ? JSON.parse(data.toString()) : [];
}

const getCartDataById =  (id) => {
  if (!fs.existsSync(dir))  return 'No Data Found'
  const data = fs.readFileSync(dir)
  const parseData =data.length ?  JSON.parse(data.toString()) : []
  const userlist = parseData.filter( list => list.customerId === id)
  return userlist.length ? userlist : [];
}
const deleteByIdCart = (id) => {
    let message
    if (!id) return
    const data = getCartData().filter(item => item._id.toString() !== id)
    fs.writeFileSync(dir,JSON.stringify(data),(err)=>{
        if (err) {
          message ='Failed to add'
          throw new Error('Failed to add')
  
        }
        message ='Data Added Successfully'
  })
return message
}

const emptyUserCart = (userId) => {
  new Promise((res,rej)=>{
    if (!userId) rej(new Error('Some Thing Went Wrong'))
    else{
      const data = getCartData().filter(item => item.userId?.toString() === userId)
      fs.writeFileSync(dir,JSON.stringify(data),(err)=> {
        if (err) {
          message ='Failed to add'
          rej(new Error('Failed to add')) 
        }
        res()
      })
    }
  })
}

module.exports = { persistCartStorage,getCartData,deleteByIdCart,emptyUserCart,getCartDataById }