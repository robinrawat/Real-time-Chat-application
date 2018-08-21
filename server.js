var app = require('express')(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	ent = require('ent'),
	fs = require('fs');

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection',function(socket,username){
	socket.on('new_client',function(username){
		username = ent.encode(username);
		socket.username = username;
		socket.broadcast.emit('new_client',username);
	});

	socket.on('message',function(message){
		message = ent.encode(message);
		socket.broadcast.emit('message',{username:socket.username,message:message});
	});
});

server.listen(4040);
