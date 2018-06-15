var socket = io();
    socket.on('connect',function ()  {
        console.log("Connected to server")
    })
    socket.on('newMessage', function(newMessageObj) {
                console.log(newMessageObj)
            })
    socket.on('disconnect',function ()  {
            console.log("Disconnected from server")
        })   

    


    $('#chat-form').on('submit',function (e) {
        e.preventDefault();
        socket.emit('sendMessage',{
            "from" : "steve rogers",
            "text": $('#message').val()
        })
        $('#message').val("")

    })