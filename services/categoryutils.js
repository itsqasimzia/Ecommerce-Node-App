const Category  = require('../schema/inventory/category.schemas')

const getAllCategories = async () => {
    const allCategories = await Category.find({})
    return allCategories
}


module.exports = { getAllCategories }