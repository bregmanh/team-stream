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

- A user should be able to create a public or a private room and become the host
- A user should be able to select from a list of public rooms to join or by clicking the link (private rooms can only be joined using the link)
- In a public room, only the host should be able to control the video by playing, pausing, skipping to the next video, and scrolling through the video to change the time
- In a private room, any user can control the video
- All users should be able to adjust the volume for themselves
- A user should be able to add a video from the search list to the queue
- Videos playing on all users should be in sync with the exception of buffer delay, but pausing and playing the video or scrolling to another part will resync the videos
- A user should be able to type in the chat and interact with other users, and the chat should filter out any toxicity a message may have
- A user who is not host should be able to leave the room and the room will still exist, while a host leaving will end the session

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
