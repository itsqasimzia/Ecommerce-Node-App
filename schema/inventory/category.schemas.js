const mongoose = require("mongoose");
const CategorySchema = mongoose.Schema;
const categoryModel = new CategorySchema(
  {
    categoryname: String,
    isActive: Boolean,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("category", categoryModel);
