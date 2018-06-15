const express = require('express')
const path = require('path')
const fs = require('fs')
const port = process.env.PORT || 3000
var app = express();

app.use(express.static(path.join(__dirname,'public')))
app.use((req,res,next) => {
    var log = `${new Date().toString()} ${req.method}  ${req.url} `
    console.log(log)
    fs.appendFile('server.log',log + '\n',(err) => {
        if(err) {
            console.log("Unable to write log file")
        }
    })
})

app.listen(port,(err,res) => {
    if(err) {
        console.log(err)
    } else {
        console.log(`Node chat app started on ${port}` );
    }
})