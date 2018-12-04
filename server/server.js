const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {
  generateMessage,
  generateLocationMessage
} = require('./utils/message');
const {
  Users
} = require('./utils/users');
const {
  isRealString
} = require('./utils/validation');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();


app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required');
    }
    console.log(`room list: ${users.getRoomList()}`);
    //if name used by another user than alert
    if(users.getUserCountByName(params.name,params.room)>0)
    {
      callback('This name taken by another user for this room please try another one');
    }
    socket.join(params.room);
    users.removeUser(socket.id); //remove user from other rooms
    users.addUSer(socket.id, params.name, params.room); //add user according to room name

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    io.emit('updateRoomList',users.getRoomList());
    //yanlızca o odadakilere kullanıcı katıldı bildirimi göndermek
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined`));

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room)); //update the user list
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`)); //user leave message
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
