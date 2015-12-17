var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var robot = require("robotjs");
robot.setMouseDelay(5);

app.use(express.static(__dirname + '/www'));
app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', function(socket) {
    socket.on('data_tracker', function(data) {
        console.log(data);
        if (data.color === 'yellow') {
            robot.moveMouseSmooth(data.x + data.width / 2, data.y + data.height / 2);
        };
        if (data.color === 'cyan') {
            robot.mouseClick();
        };

    })
});
server.listen(80);
