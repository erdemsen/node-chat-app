const path = require('path');
const http = require('http');
const express = require('express');
var favicon = require('serve-favicon');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io= socketIO(server);

app.use(express.static(publicPath));
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));

io.on('connection',(socket)=>{
  console.log('New user connected');
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
