const mongoose = require("mongoose");
const CategorySchema = mongoose.Schema;
const productModel = new CategorySchema({
  productname: String,
  price: Number,
  quantity: Number,
  manufacturer: String,
  color: String,
  expirydate: String,
  image:String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    default: "636a9b6dc0e67b19b2be8c19",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    default: "636a9b6dc0e67b19b2be8c19",
  }
},
{
  timestamps:true
}
);
module.exports = mongoose.model("product", productModel);
