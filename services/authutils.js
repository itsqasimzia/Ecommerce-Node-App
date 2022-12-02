const User = require("../schema/auth/registration.schemas");

const isAdmin = async (id) => {
  try {
    return await User.findOne({ _id: id, userRole: "admin" });
  } catch (error) {
    return { status: 401, message: "you are not authorized" };
  }
};
const isCustomer = async (id) => {
  try {
    return await User.findOne({ _id: id, userRole: "customer" });
  } catch (error) {
    return { status: 401, message: "admin can not place order" };
  }
};
const getOTPCODE = async(userId) => {
 const otp = await User.findOne({_id:userId},{},{new:true})
 return otp
}
const removeUserOTP = async(userId,verified) => {
  const removeOtp = await User.findOneAndUpdate({_id:userId},{otpCode:'',noVerified:verified},{
    new:true
  })
  return removeOtp
 }

const isOTPfieldExists = async(userId) => {
  const removeOtp = await User.findOne({_id:userId,otpCode:{$exists:true}})
  return removeOtp
 }
 
module.exports = { isAdmin,isCustomer,getOTPCODE,removeUserOTP,isOTPfieldExists };
