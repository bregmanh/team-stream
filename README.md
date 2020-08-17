# TeamStream

A modern client application using React on the front-end, and Node.js and PSQL with Knex on the back-end with socket.io to relay the information back and forth.

TeamStream is an app that allows users to join or create rooms to watch youtube videos with others in sync and communicate over live chat. Rooms can either be private or public. Public rooms are accessible to everyone whereas private rooms can only be joined using an invite link.

We were inspired to build this app because as most of us are being confined to our homes at the moment, it’s difficult to find ways to socialize and connect. Studies have shown that since the pandemic started, people have been turning to Youtube to find uplifting and entertaining content. We thought it would be great if we could merge the two and introduce a social aspect to our daily youtube dopamine hits. Aaron is going to take it from here.

## Tech Stack Used

- React
- Node.js with Express
- PostgreSQL with Knex
- Socket.io

## Illustration

Below is an illustration of of making a private room, adding a couple of videos to the playlist (a dog video and a cat video).

![GIF illustration of making a private room](https://github.com/bregmanh/team-stream/blob/master/docs/private-room-add-vids.gif?raw=true)

Below is an illustration of sending a friend a link to access the private room. The friend can also control the video and playlist. All watchers in a private room can watch the video in sync.

![GIF illustration of adding a friend to a private room](https://github.com/bregmanh/team-stream/blob/master/docs/private-add-friend.gif?raw=true)

The two illustrations above only depicit a small number of the funtionalities. For the full list, please see the next Functionalities section.

## Functionalities

- A user is able to create a public or a private room and become the host.
- A user is able to join public or private rooms. Anyone can join public rooms by browsing a list of active public rooms. Private rooms can be joined by using a link to the private room.
- In a public room, only the host is able to control the video by playing, pausing, skipping to the next video, and scrolling through the video to change the time.
- In a private room, any user can control the video.
- All users are able to adjust the volume for themselves.
- A user is able to add a video from the search list to the queue.
- Videos play in sync for all the users with the exception of unexpected buffer delays, but pausing and playing the video or scrolling to another part will resync the videos.
- A user is able to type in the chat and interact with other users, and a toxicity filter replaces all potentially offensive messages with "TeamStream is so awesome!". This was accomplished with a machine learning library.
- A user who is not host is able to leave the room and the room will still exist, while a host leaving will end the session.

## Setup

1. **Install dependencies for both server and client**

```sh
npm install
```

2. **Setup database**
   
   With a database supported by Knex, please create a database named teamstream with superuser, then run the following command:

```sh
npx knex migrate:latest
```

3. **Download Youtube API Key**

   a) Once logged into Google, please visit https://console.developers.google.com/cloud-resource-manager to create a project named teamstream

   b) Select the Youtube Data API v3 from the list of APIs to enable and add to the project, and add credentials to call the API from a web server to access public data

   c) Once Google creates the project, please copy and paste the API key to the .env.example file and rename the file to .env

4. **Start the server**

```sh
npm run dev
```

5. **Start the client**

```sh
npm start
```
