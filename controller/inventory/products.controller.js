const { productValidation } = require("../../validators/inventory/product.val");
const { addProductDb } = require("../../model/inventory/product.model");
const { isAdmin } = require("../../services/authutils");
const allProductsList = (req, res) => {
  res.send("category routes");
};
const createProductRequest = async (req, res) => {
  try {
    await productValidation.validateAsync(req.body);
    await isAdmin(req.session?.userId);
  } catch (error) {
    return res.status(error.status ? error.status : 422).send(error.message);
  }

  const savedProduct = await addProductDb(req.body,req.session?.userId);
  if (savedProduct?.status === 500 && savedProduct.error) {
    return res.status(500).send({ error: savedProduct.error });
  }
  return res.status(201).send("Product Created Successfully");
};

module.exports = { createProductRequest, allProductsList };
