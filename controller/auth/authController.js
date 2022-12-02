const UserModel = require("../../schema/auth/registration.schemas");
const { nanoid } = require('nanoid')
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN)
const {
  generateHash,
  compareHash,
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
} = require("../../services/jwtservices");
const { socketCli } = require("../../views/helpers/orderlisthelper");
const { saveOTP } = require("../../model/user/user.model");
const { getOTPCODE, removeUserOTP } = require("../../services/authutils");

const userLogin = async (req, res) => {
  // const emitter = req.app.get('eventEmitter')
  // emitter.emit('sourceLoaded',{data:'mydata is going to server by the way'})
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send({ err: "missing field" });
  }

  const findUser = await UserModel.findOne({ email });
  if (!findUser) {
    return res.status(404).send({ error: true, message: "user not found" });
  }
  const comparePassword = await compareHash(findUser?.password, password);

  if (!comparePassword) {
    return res.status(400).send({ message: "password doesnt match " });
  }

  const { ACCESS_TOKEN, REFRESH_TOKEN } = generateTokens(findUser);
  let payload = { ACCESS_TOKEN, REFRESH_TOKEN }
  req.session.userId = findUser?._id;
  req.session.JWT = payload
  if (findUser && comparePassword) {
    socketCli.emit('userlogin',findUser?._id)
    return res.redirect('/')
  }
};


const registerUserWithPhoneNo = async(req,res) => {
  const {phoneno} =  req.body
  if (!phoneno) {
    return res.status(400).send('Empty Field')
  }
  const OTP  = nanoid(5)
  try {    
  const  sendOTP =  await twilio.messages.create({
    body: OTP,
    from: process.env.TWILIO_PHONE_NO,
    to: phoneno
  })
  
  const extractOTP  = sendOTP.body.split('-')[1].trim()  
  await saveOTP(req.session.userId,extractOTP)

  } catch (error) {
    throw new Error(error)
  }
  res.redirect('/auth/verifyotp')
} 

const verifyOTP = async (req,res) => {

  const {otpcode} = req.body
  try {
    const user =  await getOTPCODE(req.session.userId)
    if (user.otpCode !== otpcode) {
      return res.status(400).send('Wrong OTP')
    }
    await removeUserOTP(user._id,true)
  } catch (error) {
    new Error('verify otp',error)
  }
  res.redirect('/')
}

const userRegistration = async (req, res) => {
  
  const {
    firstName,
    lastName,
    email,
    password,
    userRole,
    phoneNumber,
    city,
    state,
    zipCode,
    status,
  } = req.body;
  if (!firstName || !lastName || !email || !password || !city || !state || !zipCode ) {
    return res.status(400).send({ err: "missing field" });
  }

  const findUser = await UserModel.find({ email });
  if (findUser.length) {
    return res.status(403).send({ message: "user already exists" });
  }
  let address = {
    city:city,
    state:state,
    zipCode:zipCode
  }
  const hashPassword = await generateHash(password);

  const userModel = new UserModel({
    firstName,
    lastName,
    email,
    userRole,
    phoneNumber,
    address:address,
    status,
    password: hashPassword,
    userRole,
  });
  const user = await userModel.save();

  // res.status(201).send({ message: "user saved successfully", user: user });
  res.redirect('/')
};

const regenerateToken = (req, res) => {
  const { access_token, refresh_token } = req.body;

  const isVerifiedAccesToken = verifyAccessToken(access_token);
  const isVerifyRefreshToken = verifyRefreshToken(refresh_token);

  if (!isVerifiedAccesToken?.error && !isVerifyRefreshToken?.error) {
    const { access_token, refresh_token } =
      generateTokens(isVerifiedAccesToken);
    return res.status(201).send({ access_token, refresh_token });
  }

  res.status(500).send("internal server error");
};

module.exports = {
  userLogin,
  userRegistration,
  regenerateToken,
  registerUserWithPhoneNo,
  verifyOTP
};
