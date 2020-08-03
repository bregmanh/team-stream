const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const PORT = 8080;

const users = [];
const botName = "TeamStream"

io.on("connection", socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
    socket.emit('message', {id: 1, body:'Welcome to ChatCord!'});

    socket.broadcast
      .to(user.room)
      .emit('message', {id: 1, body: `${user.username} has joined the chat`})
      

  })
    socket.emit("your id", socket.id);
    console.log("socket id", socket.id)
    socket.on("send message", body => {
        io.emit("message", body)
    })
})

function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

server.listen(PORT, () => console.log("server is running on port 8080"));