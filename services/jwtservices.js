const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateHash = async (password) => {
  if (!password.length) {
    throw new Error("Password id undefined");
  }
  // crypto.randomBytes(64).toString("hex");
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const compareHash = async (password, userpassword) => {
  if (!password?.length) {
    throw new Error("Password id undefined");
  }
  const isTrue = await bcrypt.compare(userpassword, password);

  return isTrue;
};

const generateTokens = (user) => {
  const ACCESS_TOKEN = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "25m",
  });

  const REFRESH_TOKEN = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "50m",
  });

  return { ACCESS_TOKEN, REFRESH_TOKEN };
};

const verifyAccessToken = (token) => {
  let decode = {};
  try {
    decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    if (error) {
      decode.error = error.message;
    }
  }

  return decode;
};
const verifyRefreshToken = (token) => {
  let decode = {};
  try {
    decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    if (error) {
      decode.error = error.message;
    }
  }
  return decode;
};

const isUserAuthenticated = async (req, res, next) => {
  const { authorization } = req.headers;
  const userToken = authorization && authorization.split(" ")[1];

  const verify = verifyAccessToken(userToken);
  if (verify) {
    next();
  } else {
    throw new Error("Authentication failed");
  }
};

const errorHandlingMiddleWare = (err, req, res, next) => {
  console.log("my error =======>>>>>", err);
};

module.exports = {
  generateHash,
  compareHash,
  generateTokens,
  verifyAccessToken,
  isUserAuthenticated,
  verifyRefreshToken,
  errorHandlingMiddleWare,
};
