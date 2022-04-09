const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
  cors:{
    origin: "*"
  }
});


io.on('connection', (socket) => {

    //Forming Room
    // socket.to("some room").emit("some event");
    //Forming Room

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