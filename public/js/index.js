var socket = io();
    socket.on('connect',function ()  {
        console.log("Connected to server")
    })
    socket.on('newMessage', function(newMessageObj) {
                console.log(newMessageObj)
                if(newMessageObj.from === "Admin") {
                    var el = $('<div style="color:grey;text-align:center;padding-top:5px;"></div>')
                     el.text(newMessageObj.text)
                    $("#messages").append(el)
                } else {
                    // var el = $('<div style="padding:5px;text-align:left"></div>')
                    var name = $("<strong style='color:#62e0a3'></strong>").text(newMessageObj.from)
                    var createdAt = $('<p style="display:inline;font-size:12px"></p>').text('      '  +  newMessageObj.createdAt)
                    var message = $("<p></p>").text(newMessageObj.text)                    
                    // el.text(newMessageObj.from +": "+ newMessageObj.text)
                    $('#messages').append(name,createdAt,message)
 
                }
            })
    socket.on('disconnect',function ()  {
            console.log("Disconnected from server")
        })   

    $('#chat-form').on('submit',function (e) {
        e.preventDefault();
        socket.emit('sendMessage',{
            "from" : $('#username').val(),
            "text": $('#message').val()
        })
        // var element = $('<div style="padding:5px;text-align:right"></div>')
        // // element.text($('#username').val() +": "+ $('#message').val())
        // var name = $("<strong style='color:#62e0a3'></strong>").text($('#username').val())
        // var createdAt = $('<p style="display:inline;font-size:15px"></p>').text('   '  +   )        
        // var message = $("<p></p>").text($('#message').val())                    
        // $('#messages').append(name,createdAt,message)
        // // $('#messages').append(element)
        $('#message').val("")

    })