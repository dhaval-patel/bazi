#!/usr/bin/env node

var app = require('../server').app;
var http = require('http');
var Socket = require('../sockets');

var server = http.createServer(app);

new Socket.Socket(server);

server.listen(app.get('port'), function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('This express angular app is listening on port:' + port);
});