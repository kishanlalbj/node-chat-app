const express = require('express')
const path = require('path')
const http = require('http')
const fs = require('fs')
const favicon = require('serve-favicon')
const port = process.env.PORT || 3000
const socketIO = require('socket.io')
const {generateMessage} = require('./server/utils/message');

var app = express();

var server = http.createServer(app)
var  io = socketIO(server)
io.on('connection',(socket)=> {
    console.log("Connected to client socket" ,socket.id)

    socket.broadcast.emit('newMessage', generateMessage('Admin','New User Joined'))

    socket.emit('newMessage',generateMessage('Admin','Welcome to Chat App'))

    socket.on('sendMessage',(messageObj) => {
        console.log("Sending message from", socket.id)
        io.emit('newMessage',generateMessage(messageObj.from,messageObj.text))
    })

    socket.on('disconnect',() => {
        console.log("User Disconnected")
    })
})

app.use(favicon(path.join(__dirname, 'favicon.png')))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'node_modules')))

app.use((req,res,next) => {
    var log = `${new Date().toString()} ${req.method}  ${req.url} `
    // console.log(log)
    fs.appendFile('server.log',log + '\n',(err) => {
        if(err) {
            console.log("Unable to write log file")
        }
    })
})

server.listen(port,(err,res) => {
    if(err) {
        console.log(err)
    } else {
        console.log(`Node chat app started on ${port}` );
    }
})