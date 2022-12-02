require("dotenv").config();
const express = require("express");
const app = express();
const {createServer} = require("http");
const {Server} = require("socket.io");
const mongoose = require("mongoose");
const helpers = require('./views/helpers/orderlisthelper')

// import modules
const { ConnectDb } = require("./config/mongoDb");
const EventEmitter =  require('events');
const { configs } = require("./config/appConfig");
const { routingMiddlewares } = require("./config/routingmidlewareConfig");
const httpServer = createServer(app)
const SERVER_PORT = process.env.PORT || 5000;


// all third party middlwares init
configs(app)

// Routing MiddleWare
routingMiddlewares(app)

// event emitters
const io = new Server(httpServer,{
  cors:{
    origin:'http://localhost:3000'
  }
})
const eventEmitter = new EventEmitter()
app.set('eventEmitter',eventEmitter)

 
io.on('connection',(socket)=>{
  console.log('connection establish',socket.id)

  socket.on('userlogin',(data)=>{
    socket.join(data)
  })
})

eventEmitter.on('orderstatus',(data)=>{
  io.to(data.user).emit('change',data)
})
helpers.showToast(io)

if (mongoose.STATES[mongoose.connection.readyState] === "disconnected") {
  ConnectDb()
    .then((res) => {
     httpServer.listen(SERVER_PORT, () => {
        console.log(`listening on port ${SERVER_PORT} `);
      });
    })
    .catch((err) => {
      console.log("failed to connect ...", err.message);
    });
}