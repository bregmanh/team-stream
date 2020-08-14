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

Below is an illustration of some of the main app functionalities. The full list of functionaities is provided in the next section.

![GIF illustration of the main functionalities](https://github.com/bregmanh/scheduler/blob/master/docs/overview.gif?raw=true)

## Functionalities

- A user can create a public or a private room (difference being in public room only the host can control the video, and in private room only )

## Setup


1. **Install dependencies for both server and client**
```sh
npm install
```
2. **Start the server**
```sh
npm run dev
```
3. **Start the client**
```sh
npm start
```
