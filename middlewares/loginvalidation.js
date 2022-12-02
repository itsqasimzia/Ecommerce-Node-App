const { isAdmin } = require("../services/authutils");

const loginValidation = async (req, res, next) => {
  if (!req?.session?.userId) {
        return res.redirect('/auth/login');
      } else {
        const admin = await isAdmin(req?.session?.userId) 
        res.locals.isAdmin = admin
        next();
      }
    }


    module.exports = {loginValidation}