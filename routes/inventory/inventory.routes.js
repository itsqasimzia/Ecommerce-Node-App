const inventoryRoutes = require("express").Router();
const categoryController = require("../../controller/inventory/category.controller");
const productController = require("../../controller/inventory/products.controller");
const orderController = require("../../controller/inventory/order.controller");
const { getAllCategories } = require("../../services/categoryutils");
const multer = require('../../middlewares/multer') 
const helper = require('../../services/data-persistent')
const {appendToken} = require('../../middlewares/appendtoken')



// Category Views
inventoryRoutes.route('/product/add').get(appendToken,async(req,res)=>{
  const allCategories =await getAllCategories()
  const cartItem = helper.getCartData()

  res.render('addproduct',{categories:allCategories,cart:cartItem})
})




// category routes
inventoryRoutes.get("/category", appendToken,categoryController.allCategoriesList);
inventoryRoutes.post("/category/add", appendToken,categoryController.createCategoryRequest);
// inventoryRoutes.post("/category/:id", categoryController);
// inventoryRoutes.patch("/category/:id", categoryController);

// product routes
// inventoryRoutes.get("/products", categoryController.allCategoriesList);
inventoryRoutes.post("/product/add",appendToken,multer.upload, productController.createProductRequest);


// add to cart 
// inventoryRoutes.post("/product/addtocart", );


// order routes 
// product routes
// inventoryRoutes.get("/products", categoryController.allCategoriesList);
inventoryRoutes.post("/order/create",appendToken,orderController.createOrderRequest )
// order views
inventoryRoutes.post('/order/confirm',appendToken,orderController.confirmOrderRequest)

module.exports = {
  inventoryRoutes,
};
