const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const PORT = 8080;
const knex = require('./db/knex.js');

const users = [];
const botName = "TeamStream"

const hostInfo = {
  videoId: null,
  time: 0,
  play: true,
  queue: [],
  index: 0,
}

let pingHostInterval;

io.on("connection", socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
    socket.emit('message', { id: 1, username: `TeamStreamBot`, message: 'Welcome to TeamStream!' });

    socket.broadcast
      .to(user.room)
      .emit('message', { id: 1, username: `TeamStreamBot`, message: `${user.username} has joined the chat` })

  })
  // Runs when client disconnects
  socket.on('disconnect', () => {
    const room = getCurrentUser(socket.id).room;
    if (users[0].id === socket.id) {
      clearInterval(pingHostInterval);
      io.to(room).emit('session closed');
    }
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        'message', { id: 1, username: `TeamStreamBot`, message: `${user.username} has left the chat` })
    }
  });

  // Create a session when user clicks to create
  socket.on('create-session', () => {
    console.log('knex test')
    knex('sessions').insert({title: 'Cute Dog Videos', active: true, public: true})
  })

  socket.emit("your id", socket.id);
  socket.on("send message", body => {
    const user = getCurrentUser(socket.id);
    const messageObj = createMsgObj(body, user)
    io.to(user.room).emit("message", messageObj)
  })

  socket.on("videoAction", action => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("videoAction", { action, hostInfo })
  })

  //if not a host, request for video info from the host
  socket.on("requestVideoInfo", action => {
    if (users[0].id !== socket.id) {
      socket.emit("provideVideoInfo", hostInfo)
    } else {
      // //added - even if host, we want to provide it with initial info
      // socket.emit("provideVideoInfo", hostInfo)

      pingHostInterval = setInterval(() => {
        io.to(users[0].id).emit("pingHostForInfo", "");
      }, 200)
    }
  })

  socket.on("HostInfo", info => {
    hostInfo.time = info.time
    hostInfo.play = info.play
    hostInfo.index = info.index

  })

  socket.on("addVideo", videoId => {
    hostInfo.queue.push(videoId)
    //emits the updated queue to host
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("updatedQueue", hostInfo.queue);
  })

})

function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
    console.log({ users });
  }
}
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

function createMsgObj(msg, user) {
  return {
    id: msg.id,
    message: msg.body,
    username: user.username
  }
}



server.listen(PORT, () => console.log("server is running on port 8080"));