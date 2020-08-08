const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const toxicity = require('@tensorflow-models/toxicity');
const tfjs = require("@tensorflow/tfjs-node");
const { kStringMaxLength } = require("buffer");
const io = socket(server);
io.origins('localhost:3002') // for development mode to whitelist this port
const PORT = 8080;
const knex = require('./db/knex.js');
const { resolve } = require("path");

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
const threshold = 0.9;

toxicity.load(threshold).then(model => {

  io.on("connection", socket => {
    // Create a session when user clicks to create


    socket.on('joinRoom', ({ username, room }) => {

      const promiseObj = new Promise((resolve, reject) => {

        resolve(userJoin(socket.id, username, room))
      }).then((user) => {
        console.log("user", user)
        socket.join(user.session_id);
        socket.emit('message', { id: 1, username: `TeamStreamBot`, message: 'Welcome to TeamStream!' });

        socket.broadcast
          .to(user.session_id)
          .emit('message', { id: 1, username: `TeamStreamBot`, message: `${user.username} has joined the chat` })
      }).catch((e) => console.log("error", e))

      //userJoin(socket.id, username, room)



      // const user = userJoin(socket.id, username, room)


    })
    // Runs when client disconnects
    socket.on('disconnect', () => {
      const user = getCurrentUser(socket.id);
      const session_id = user.session_id;
      //if(user.isHost)
      if (users.isHost) {
        clearInterval(pingHostInterval);
        io.to(session_id).emit('session closed');
      }
      const userLeft = userLeave(socket.id);
      if (userLeft) {
        io.to(userLeft.session_id).emit(
          'message', { id: 1, username: `TeamStreamBot`, message: `${userLeft.username} has left the chat` })
      }
    });

    socket.emit("your id", socket.id);
    socket.on("send message", body => {

      model && model.classify([body.body]).then(predictions => {
        console.log(predictions);
        predictions.map((item) => {
          if (item.results[0].match === true) {
            body.body = 'Francis'
          }
        })
        const user = getCurrentUser(socket.id);
        const messageObj = createMsgObj(body, user)
        io.to(user.session_id).emit("message", messageObj)
      });

    })

    socket.on("videoAction", action => {
      const user = getCurrentUser(socket.id);
      io.to(user.session_id).emit("videoAction", { action, hostInfo })
    })

    // Listen for change in video time
    socket.on("videoTime", action => {
      const user = getCurrentUser(socket.id);
      io.to(user.session_id).emit("videoTime", { action })
    })

    //if not a host, request for video info from the host
    socket.on("requestVideoInfo", action => {
      //need to know if user in this session_id is host
      const promiseObj = new Promise((resolve, reject) => {

        resolve(getCurrentUser(socket.id))
      }).then((user) => {

        if (!user.isHost) {
          socket.emit("provideVideoInfo", hostInfo)
        } else {
          //if host joins, get a modal to invite friends
          socket.emit("inviteFriends", "")
          //start pinging the host for info
          pingHostInterval = setInterval(() => {
            io.to(user.id).emit("pingHostForInfo", "");
          }, 200)
        }
      }).catch(e => {
        console.log("error", e)
      })
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

      io.to(user.session_id).emit("updatedQueue", hostInfo.queue);
    })

  })

  function userJoin(id, username, room) {
    // const user = { id, username, session_id };

    // users.push(user);

     return knex.from('users').where('session_id', room).then(rows => {
      //Note!: need to check if session is valid! and add references session id in migrations!!!!
      //if current session_id is empty
      if (rows.length === 0) {
        knex('users').insert({ id: id, name: username, active: true, isHost: true, session_id: room }).returning('*').then((rows) => {
          console.log("rows", rows[0]);
          return rows[0];
       
        })
      } else {
        knex('users').insert({ id: id, name: username, active: true, isHost: false, session_id: room }).returning(knex.raw('*')).then((rows) => { return rows[0] })
      }
    })
    

  }

  // User leaves chat
  function userLeave(socket_id) {
    //node: alter user active to false



    // knex('users')
    //.where({ id: socket_id })

    //.returning('*')
    //.then(rows => {return rows})
    const index = users.findIndex(user => user.id === socket_id);

    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
  }
  function getCurrentUser(socket_id) {
    // knex.from('users').select('*')
    //   .where( 'id', socket_id )
    //   .then((rows) => {
    //     console.log("rows", rows)
    //     return rows[0]
    //   })
    console.log("socket id", socket_id)
     knex.from('users').where('id', socket_id).then(rows => {
      console.log("rows", rows);
      return rows[0];
    });

    // //need to return an object with the format: { id, username, session_id, isHost }
    // return users.find(user => user.id === socket_id);
  }

  function createMsgObj(msg, user) {
    return {
      id: msg.id,
      message: msg.body,
      username: user.username
    }

  }



  server.listen(PORT, () => console.log("server is running on port 8080"));

})