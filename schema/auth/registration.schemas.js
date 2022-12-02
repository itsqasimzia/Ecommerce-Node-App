const mongoose = require("mongoose");
const UserSchema = mongoose.Schema;
const userModel = new UserSchema(
  {
    firstName: {
      type: String,
      required: [true, " firstName Is Required"],
      minLength: 4,
      maxLength: 20,
    },
    lastName: {
      type: String,
      required: [true, " lastName Is Required"],
      minLength: 3,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      // get: helloName,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    userRole: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
    phoneNumber: {
      type: String,
      required: true,
      // get: helloName,
    },
    otpCode:{
      type:String,
    },
    noVerified:{
      type:Boolean,
      default:false
    },
    address: {
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: Number,
        required: true,
      },
    },
  }
  // this part is used when we don't want to save name in plural
  // {
  // collection:'something'
  // }
);
// userModel.set("toJSON", { getters: true });

module.exports = mongoose.model("user", userModel);
