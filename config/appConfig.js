const { mySession } = require("./sessionsConfig");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const flash = require('express-flash')
const express = require('express')

exports.configs = (app)=>{

app.use(express.static("assets/images"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieparser('keyboard cat'));
app.use(mySession);
app.use(flash());

}