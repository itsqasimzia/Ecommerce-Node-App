const Product = require("../../schema/inventory/products.schemas");

const addProductDb = async (body, id) => {

  const product = new Product({
    productname: body.productname,
    price: body.price,
    quantity: body.quantity,
    manufacturer: body.manufacturer,
    color: body.color,
    sold:body.sold,
    image:body.image,
    expirydate: body.expirydate,
    categoryId: body.categoryId,
    userId:id
  });
  try {
    return await product.save();
  } catch (error) {
    return { status: 500, error: error };
  }
};

module.exports = { addProductDb };
