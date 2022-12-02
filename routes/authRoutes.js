const express = require("express");
const authRouter = express.Router();

// controllers
const authController = require("../controller/auth/authController");
const { isUserAuthenticated } = require("../services/jwtservices");

// View Roots 
authRouter.route('/login').get((req,res)=>{ res.render('Login')})
authRouter.route('/regestration').get((req,res)=>{res.render('Regestration')})
authRouter.route('/regestration/phoneno').get((req,res)=>{res.render('PhoneScreen')})
authRouter.route('/verifyotp').get((req,res)=>{res.render('OTPScreen')})

// auth/verifyotp


// routes
authRouter.post("/login", authController.userLogin);
authRouter.post("/regestration", authController.userRegistration);
authRouter.post("/regestration/phoneno", authController.registerUserWithPhoneNo);
authRouter.post("/verifyotp", authController.verifyOTP);
authRouter.post(
  "/regenerateToken",
  isUserAuthenticated,
  authController.regenerateToken
);
module.exports = { authRouter };
