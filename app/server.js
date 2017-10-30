const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = 8080;
let clientCount = 0;

app.use(express.static(__dirname + '/../../mysocket'));
app.use(express.static(__dirname + './lib'));

app.get('/', function(req, res) {
    res.sendfile('./view/index.html');
});
io.on('connection', function(socket) {
    clientCount++;
    socket.nickName = 'user' + clientCount;

    socket.emit('entry', socket.nickName + 'comes in');

    socket.on('message', function(str) {
        io.emit("message", socket.nickName + "say:" + str);
    });

    socket.on('disconnect', function() {
        io.emit("leave", socket.nickname + "left")
    });
});

server.listen(PORT, function() {
    console.log('websocket server listening PORT on' + PORT);
})