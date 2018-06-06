var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/bower_components'));  

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

app.get('/index.css', function(req, res,next) {  
    res.sendFile(__dirname + '/index.css');
});

server.listen(4200); 

io.on('connection', function(client) {  
    console.log('Client connected...');

    // client.on('join', function(data) {
    //     console.log(data);
    //     client.emit('messages', 'Hello from server');
    // });

    setInterval(function() {
        // A JSON formated list of temperatures.
        var temps = [
                { 'name' : 'Pipe1', 'value': Math.floor(Math.random() * 100 + 1) },
                { 'name' : 'Pipe2', 'value': Math.floor(Math.random() * 100 + 1) },
                { 'name' : 'Pipe3', 'value': Math.floor(Math.random() * 100 + 1) },
                { 'name' : 'Pipe4', 'value': Math.floor(Math.random() * 100 + 1) }
            ];

        client.emit('readouts', JSON.stringify(temps));
    }, 3000);
});