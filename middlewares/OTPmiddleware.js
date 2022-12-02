const { getOTPCODE } = require("../services/authutils")

const isOTPavailable =async (req,res,next) => {
    const user = await getOTPCODE(req.session.userId)
    if (user && req.session.userId  && user.noVerified) {
           return next()
    } else{
        return res.redirect('/auth/regestration/phoneno')
    }
}


module.exports = { isOTPavailable }