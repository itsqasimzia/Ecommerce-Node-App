const Category = require("../../schema/inventory/category.schemas");

const addCategoryDb = async (body, id) => {
  const category = new Category({
    categoryname: body.categoryname,
    isActive: body.isActive,
    userId: id,
  });
  try {
    return await category.save();
  } catch (error) {
    return { status: 500, error: error };
  }
};

module.exports = { addCategoryDb };
