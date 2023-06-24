const io = require('socket.io')(3000, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }
  });
  
//   io.on('connection', (socket) => {
//     console.log("new user")
//     socket.emit('chat-message', 'Hello world')
//   });
  
const users = {};
io.on('connection', socket =>{
    socket.on('new-user-joined', data =>{
        //console.log("new user", data)
        users[socket.id] = data;
        socket.broadcast.emit('user-joined', data);
    });
     
    socket.on('send', message => {
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})
  