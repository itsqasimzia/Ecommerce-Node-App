const USER = require('../../schema/auth/registration.schemas')

const saveOTP = async (userId,code,sid) => {
 const user = await USER.findByIdAndUpdate({_id:userId},{otpCode:code},{
                new:true
                 })
   return user
}


module.exports = {  saveOTP }