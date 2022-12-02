const sessions = require("express-session");
const oneDay = 1000 * 60 * 60 * 24;

const mySession = sessions({
  secret: "mysecretisscaryone",
  saveUninitialized: false,
  cookie: { maxAge: oneDay },
  resave: false,
  
});

module.exports = { mySession };
