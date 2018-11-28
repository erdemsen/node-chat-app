var socket = io();

socket.on('connect',function(){
  console.log('connection established');

  socket.emit('createMessage',{
    from:'j@example.com',
    text:'Some text'
  });
});
socket.on('disconnect',function(){
  console.log('disconnection established');
});

socket.on('newMessage',function(message){
  console.log('new message',message);
});
