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
const { tile } = require("@tensorflow/tfjs-node");

const users = [];
const botName = "TeamStream"

// const hostInfo = {
//   videoId: null,
//   time: 0,
//   play: true,
//   queue: [],
//   index: 0,
// }

let pingHostInterval;
const threshold = 0.9;

toxicity.load(threshold).then(model => {

  io.on("connection", socket => {
    // Create a session when user clicks to create
    socket.on('is-session-active', roomId => {
      knex.from('sessions').where('id', roomId).then(rows => {
        console.log("sessions rows", rows)
        if (rows.length > 0 && rows[0].active === true) {
          socket.emit('session-status', true);
        } else {
          socket.emit('session-status', false);
        }
      })
    })
    socket.on('create-session', ({ room, title, publicBool }) => {
      console.log("public bool", publicBool)
      knex('sessions').insert({ id: room, title: title, active: true, public: publicBool }).then(() => {
      })
    })

    socket.on('joinRoom', ({ username, room }) => {
      knex.from('users').where('session_id', room).then(rows => {
        //Note!: need to check if session is valid! and add references session id in migrations!!!!
        //if current session_id is empty
        if (rows.length === 0) {
          knex('users').insert({ id: socket.id, username: username, active: true, isHost: true, session_id: room }).returning('*').then((rows) => {
            const user = rows[0];

            socket.join(user.session_id);
            socket.emit("your id", socket.id);
            socket.emit('message', { id: 1, username: `TeamStreamBot`, message: 'Welcome to TeamStream!' });

            socket.broadcast
              .to(user.session_id)
              .emit('message', { id: 1, username: `TeamStreamBot`, message: `${user.username} has joined the chat` })

          })
        } else {
          knex('users').insert({ id: socket.id, username: username, active: true, isHost: false, session_id: room }).returning('*').then((rows) => {
            const user = rows[0];
            console.log("rows", user)

            socket.join(user.session_id);
            socket.emit('message', { id: 1, username: `TeamStreamBot`, message: 'Welcome to TeamStream!' });

            socket.broadcast
              .to(user.session_id)
              .emit('message', { id: 1, username: `TeamStreamBot`, message: `${user.username} has joined the chat` })
          })
        }
      })

    })
    // Runs when client disconnects
    socket.on('disconnect', () => {

      //first check if user exists and is active
      knex.from('users').where('id', socket.id).then(rows => {
        if (rows.length > 0 && rows[0].active) {
          knex.from('users').where('id', socket.id).update({ active: false }).returning('*').then(rows => {
            const user = rows[0];
            const session_id = user.session_id;
            //if(user.isHost)
            if (user.isHost) {
              //set session to not active
              knex.from('sessions').where('id', session_id).update({ active: false }).then(() => {
                clearInterval(pingHostInterval);
                io.to(session_id).emit('session closed');
              })
            } else {
              io.to(user.session_id).emit(
                'message', { id: 1, username: `TeamStreamBot`, message: `${user.username} has left the chat` })
            }
          });
        }
      })
    });


    socket.on("send message", body => {

      model && model.classify([body.body]).then(predictions => {
        predictions.map((item) => {
          if (item.results[0].match === true) {
            body.body = 'Francis'
          }
        })
        //const user = getCurrentUser(socket.id);
        knex.from('users').where('id', socket.id).then(rows => {
          const user = rows[0]
          const messageObj = createMsgObj(body, user)
          io.to(user.session_id).emit("message", messageObj)
        });
      });

    })

    socket.on("videoAction", action => {
      //const user = getCurrentUser(socket.id);
      knex.from('users').where('id', socket.id).then(rows => {
        knex.from('sessions').where('id', rows[0].session_id).then(rows2 => {
          const hostInfo = {
            time: rows2[0].time,
          }
        io.to(rows[0].session_id).emit("videoAction", { action, hostInfo })
        })
      })
    })

    // Listen for change in video time
    // socket.on("videoTime", action => {
    //   //const user = getCurrentUser(socket.id);
    //   knex.from('users').where('id', socket.id).then(rows => {
    //     io.to(rows[0].session_id).emit("videoTime", { action })
    //   })
    // })

    //if not a host, request for video info from the host
    socket.on("requestVideoInfo", action => {
      //need to know if user in this session_id is host
      knex.from('users').where('id', socket.id).then(rows => {
        const user = rows[0];
        if (!user.isHost) {

          knex.select('time', 'play', 'index').from('sessions').where('id', user.session_id).then(rows => {
            const { time, play, index } = rows[0];
            console.log("host info", rows[0]);
            knex.select('videoId').from('videos').where('session_id', user.session_id).orderBy('id', 'asc').then(rows => {
              const updatedQueue = rows.map(row => row.videoId);
              const hostInfo = {
                play,
                queue: updatedQueue,
                index,
                time
              }
              socket.emit("provideVideoInfo", hostInfo)
            })
          })
        } else {
          //if host joins, get a modal to invite friends
          socket.emit("inviteFriends", "")
          //start pinging the host for info
          pingHostInterval = setInterval(() => {
            io.to(user.id).emit("pingHostForInfo", "");
          }, 200)
        }
      })
    })

    socket.on("HostInfo", info => {

      knex.from('users').where('id', socket.id).then(rows => {
        const user = rows[0]

        knex.from('sessions').where('id', user.session_id).update({ time: info.time, play: info.play, index: info.index }).then(() => {

        })
      })
    })

    socket.on("addVideo", videoObj => {
      
      //NOTE: add video to video table
      const { id, title, thumbnail } = videoObj;
      //hostInfo.queue.push(videoId)

      //hostInfo.queue.push(videoId.id)
      //emits the updated queue to host
      knex.from('users').where('id', socket.id).then(rows => {
        const user = rows[0];
        knex('videos').insert({ videoId: id, title: title, thumbnail: thumbnail, added_by: socket.id, session_id: user.session_id }).then(() => {
          knex.select('videoId').from('videos').where('session_id', user.session_id).orderBy('id', 'asc').then(rows => {
            const updatedQueue = rows.map(row => row.videoId);

            console.log("updated queue", updatedQueue);

            //NOTE: sending an array of vidoId for that session ordered by id
            io.to(user.session_id).emit("updatedQueue", updatedQueue);
          })
        })
      })
    })

    socket.on("query-public-rooms", () => {
      knex.from('sessions').where('public', true).then(rows => {
        socket.emit("show-public-rooms", rows)
      })
    })

    socket.on("cannot-control", () => {
      // knex.from("users").where("isHost", false).then(users => {
        // knex.from('users').where('id', socket.id).then(rows => {
        //   const user = rows[0]

          // console.log('does users include user? ', users.includes(user))
          // if (users.includes(user)) {
          //   const cannotControl = true
          //   io.to(user.session_id).emit("no-controls", cannotControl)
            // io.to(user.session_id).emit("no-controls", true)
          // }
        // });
        
      })
    // })

    //fetching users in a room
    socket.on('fetch-users-from-session', roomID => {
      //users = ['Sophie', 'Hannah', 'Aaron', 'Chaim', 'Francis'];
      knex.from('users').where('session_id', roomID).then(rows => {
        //converting to array of names from array of user objects
        let users = [];
        rows.map(row => {
          users.push(row.username)
        })
        socket.emit('provide-userlist', users);
      });
    })

    socket.on('fetch-queue-from-session', roomID => {

      //emits the updated queue to host
      knex.from('users').where('id', socket.id).then(rows => {
        const user = rows[0];
        knex.select('title', 'thumbnail').from('videos').where('session_id', user.session_id).orderBy('id', 'asc').then(rows => {
          const queueList = rows
          console.log("fetch-queue-from-session", queueList)
          socket.emit('provide-queuelist', queueList);
        })
      })
    });

  })

  function createMsgObj(msg, user) {
    return {
      id: msg.id,
      message: msg.body,
      username: user.username
    }

  }

  server.listen(PORT, () => console.log("server is running on port 8080"));

})