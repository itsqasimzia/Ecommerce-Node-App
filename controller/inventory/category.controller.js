const { categoryValidation } = require("../../validators/index");
const { addCategoryDb } = require("../../model/inventory/category.model");
const allCategoriesList = (req, res) => {
  res.send("category routes");
};
const createCategoryRequest = async (req, res) => {
  try {
    await categoryValidation.validateAsync(req.body);
    if (!req.session?.userId) {
      throw new Error("User Id is missing");
    }
  } catch (error) {
    return res.status(422).send(error.message);
  }

  const savedCategory = await addCategoryDb(req.body, req.session?.userId);
  if (savedCategory?.status === 500 && savedCategory.error) {
    return res.status(500).send({ error: savedCategory.error });
  }
  return res.status(201).send("Category Created Successfully");
};

module.exports = { allCategoriesList, createCategoryRequest };
