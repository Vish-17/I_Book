const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
  //...
});


io.on('connection', (socket) => {
    console.log('what is socket: ', socket);
    console.log("Socket is active to be connected");

    socket.on("noteshare", (payload)=>{
      console.log("What is playload: ", payload);
      io.emit("noteshare", payload); 
    })
  });

server.listen(4000, () => {
  console.log('listening on *:4000...');
});