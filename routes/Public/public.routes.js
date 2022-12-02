const app = require('express');
const { isAdmin } = require('../../services/authutils');
const publicRoutes = app.Router()
const { getCartData, persistCartStorage, deleteByIdCart, emptyUserCart, getCartDataById } = require("../../services/data-persistent");
const { getAllPendingOrders, updateOrderStatus, getSaleByColor } = require("../../services/orderutils");
const { getAllProducts, getProductList } = require("../../services/productutils");
const {nanoid} = require('nanoid')
const Order = require('../../schema/inventory/order.schema');
const { bundleCartItems } = require('../../services/bundleCartItems');
const moment = require('moment');
const { isOTPavailable } = require('../../middlewares/OTPmiddleware');



// Routes
publicRoutes.get("/", isOTPavailable, async (req, res) => {
    // getCartData()
    const products = await getAllProducts()
    const cartItem = getCartDataById(req.session.userId)
    const admin = await isAdmin(req.session?.userId)

    let isTrue = admin?.userRole === 'admin'

    if (req.session?.userId && !isTrue) {
         const emiter =req.app.get('eventEmitter')
         if (req.session?.mystatus) {
                    emiter.emit('orderstatus',{user:req.session?.mystatus?.customerId,currentOrderStatus:req.session?.mystatus?.orderstatus,seconduser:req.session.userId})
            }
    return res.render("Home", { productslist: products, cart: cartItem });
    }else if(req.session?.userId && isTrue){
        return res.redirect('/dashboard')
    }else{
        return res.render("Login");
    }
});

// Cart Routes
publicRoutes.get('/cartlist', async (req, res) => {
    
    const cartList =  await getCartDataById(req.session.userId)
    // const products =  await getProductList()
    const uniqueObjArray = bundleCartItems(cartList)
    const totalSum = uniqueObjArray.reduce( (acc,arr) => {
            return acc + arr.price
       } ,0)

     res.render("Cart",{cartlist:uniqueObjArray,cart:cartList,total:totalSum});
})
  



publicRoutes.route('/deleteitem/:itemid').get((req,res)=>{
    const {itemid} = req.params
    const message =  deleteByIdCart(itemid)
     res.redirect('/cartlist')
})

publicRoutes.get('/product/addtocart/:itemid', async (req, res) => {
    const id = req.params.itemid
    const products = await getAllProducts()
    const product = products.find(item => item._id.toString() === id)
    product['customerId'] = req.session.userId
    const isPersisted = persistCartStorage(product)
    res.redirect("/");
})


publicRoutes.post('/order', async (req, res) => {

    const itemsArr = getCartData()
    const products = bundleCartItems(itemsArr)
    const { amount,shippingAddres ,phone ,totalamount } = req.body


    const customerId =  req.session.userId
    const orderId = nanoid(10)
     if (!(amount == totalamount)) {
        return res.send('Order can not be placed.Credit insuficient.')
     }

    const order = new Order({
        userId:customerId,
        orderNo:orderId,
        paidAmount:amount,
        totalAmount:totalamount,
        status:'pending',
        shippingAddress:shippingAddres,
        phone:phone,
        products:products
    })

    try {
        await order.save() 
        await emptyUserCart(customerId)  
        } catch (error) {
        new Error(error)
        }
    res.redirect('/')
})

publicRoutes.post('/orderstatus/:orderno',async (req,res)=>{

    const { orderstatus } = req.body
    const { orderno } = req.params
    try {
     const data =  await updateOrderStatus(orderno,orderstatus)
     const customerId = data.userId?.toString() 
     req.session.mystatus = {orderstatus,customerId}
    } catch (error) {
      new Error('Server Error')
    }
    
    
    res.redirect('/dashboard')
  
})

// admin route
publicRoutes.get("/dashboard", async (req, res) => {

    const pendingorders = await getAllPendingOrders()
    const cartItem = getCartData()
    const stats =await getSaleByColor()
    const admin =await isAdmin(req.session?.userId)
    let isTrue = admin?.userRole === 'admin'
    if ( !isTrue) {
        return res.redirect("/auth/login" );
    }else{ 
        res.render("dashboard", { orders: pendingorders, cart: cartItem,isadmin:isTrue,moment,stats:stats[0] });
    }
});

publicRoutes.get('/auth/logout',(req,res)=>{
    delete req.session.userId
    delete req.session.JWT

    res.redirect('/auth/login')

    // req.session.destroy((err)=>{
       
    //     if (err) {
    //     console.log(err)
    //    }

    //    req.session = null
    // })

})


module.exports = { publicRoutes }