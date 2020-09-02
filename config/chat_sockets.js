module.exports.chatScokets = function(socketServer){
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket){
        console.log('new connection recived', socket.id);

        socket.on('disconnect', function(){
            console.log('Scoket Disconnected!!!!!!');
        })
    })
}