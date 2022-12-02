const notifier = require('node-notifier')
const { io } = require('socket.io-client')

const socketCli = io("http://localhost:8000")

const showToast = (socket)=> {

    socketCli.on('connect',()=>{
        console.log('client connected');
    })
    socketCli.on('examples',(data)=>{
        notifier.notify(data)
    })
    socketCli.on('change',(data)=>{
        notifier.notify(`onlineshoping update your current order to  ${data.currentOrderStatus} `)
    })
}

module.exports ={ socketCli,showToast }