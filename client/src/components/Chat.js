import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import io from "socket.io-client";
import "./Chat.css";
import Controls from "./Controls";
import LeaveRoom from "./LeaveRoom";
import Message from "./Message";
import QueueForm from "./QueueForm";

import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';


const Page = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  background-color: #3F444B;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 20vw;
  max-height: 500px;
  overflow: auto;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding-bottom: 10px;
  margin-top: 25px;
`;

const TextArea = styled.textarea`
  width: 98%;
  height: 100px;
  border-radius: 10px;
  margin-top: 10px;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 17px;
  background-color: transparent;
  border: 1px solid lightgray;
  outline: none;
  color: lightgray;
  letter-spacing: 1px;
  line-height: 20px;
  ::placeholder {
    color: lightgray;
  }
`;

const Button = styled.button`
  background-color: #10959D;
  width: 100%;
  border: none;
  height: 50px;
  border-radius: 10px;
  color: #3F444B;
  font-size: 17px;
`;

const Form = styled.form`
width: 20vw;
`;

const MyRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const MyMessage = styled.div`
  width: 45%;
  background-color: #10959D;
  color: #3F444B;
  padding: 10px;
  margin-right: 5px;
  text-align: center;
  border-top-right-radius: 10%;
  border-bottom-right-radius: 10%;
`;

const PartnerRow = styled(MyRow)`
  justify-content: flex-start;
`;

const PartnerMessage = styled.div`
  width: 45%;
  background-color: transparent;
  color: lightgray;
  border: 1px solid lightgray;
  padding: 10px;
  margin-left: 5px;
  text-align: center;
  border-top-left-radius: 10%;
  border-bottom-left-radius: 10%;
`;
export default function Chat(props) {
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(null);
  const [chatState, setChatState] = useState("open");
  let queue = [];
  const bufferTime = 4.5;
  const [videoProgress, setVideoProgress] = useState(0)

  const youtubePlayer = useRef();
  let newTime = '0:00'
  let onStateChangeFunc = null;
  const room = props.room;

  const socketRef = props.socketRef


  useEffect(() => {

    

    if (socketRef.current) {

      socketRef.current.emit('joinRoom', { username: props.username, room });
      socketRef.current.on("your id", id => {
        setYourID(id);
      })

      socketRef.current.on("message", (message) => {
        receivedMessage(message);
      })

      socketRef.current.on("videoAction", ({ action, hostInfo }) => {
        if (action.type === 'scroll-video') {
          newTime = youtubePlayer.current.getDuration() * action.data.timePercentage / 100
          youtubePlayer.current.seekTo(newTime)
          setVideoProgress(action.data.timePercentage)
        }
        if (action.type === 'scroll-volume') {
          youtubePlayer.current.setVolume(action.data.volumePercentage)
        }
        if (action.type === 'mute') {
          if (youtubePlayer.current.isMuted()) {
            youtubePlayer.current.unMute()
          } else {
            youtubePlayer.current.mute()
          }
        }
        if (action.type === "play") {
          youtubePlayer.current.playVideo();
        } else if (action.type === "pause") {

          youtubePlayer.current.pauseVideo();
          youtubePlayer.current.seekTo(hostInfo.time, true);
        } else if (action.type === "nextVideo") {
          youtubePlayer.current.nextVideo()
        }
      })

      // Listen to change in video time from server
      socketRef.current.on("videoTime", ({ action, data }) => {
        youtubePlayer.current.seekTo(newTime)
        console.log('action: ', action)
        console.log('data:', data)
        // setVideoProgress(action.data.timePercentage)
      })

      socketRef.current.on("session closed", () => {
        setRedirect('/room/closed');
      })

      socketRef.current.on("provideVideoInfo", (hostInfo) => {
        const startTime = new Date().getTime();
        // onStateChangeFunc = (e) => {
        //   console.log("player state", youtubePlayer.current.getPlayerState())
        //   if (youtubePlayer.current.getPlayerState() === 1) {

        //     const endTime = new Date().getTime();
        //     setBufferTime(endTime - startTime);
        //     onStateChangeFunc = null;
        //   }
        // }

        queue = hostInfo.queue;
        //if video is paused - not playing
        if (!(hostInfo.play)) {
          youtubePlayer.current.cuePlaylist({
            playlist: queue,
            index: hostInfo.index,
            startSeconds: hostInfo.time + bufferTime,
          })
        } else {
          youtubePlayer.current.loadPlaylist({
            playlist: queue,
            index: hostInfo.index,
            startSeconds: hostInfo.time + bufferTime,
          })
        }
      })

      socketRef.current.on("pingHostForInfo", info => {
        let playerState = youtubePlayer.current.getPlayerState()
        console.log("player state", playerState)
        let videoInfo = {
          time: youtubePlayer.current.getCurrentTime(),
          play: playerState === 1,
          index: youtubePlayer.current.getPlaylistIndex(),
        }

        socketRef.current.emit("HostInfo", videoInfo)
      })

      socketRef.current.on("updatedQueue", updatedQueue => {
      
        queue = updatedQueue;
        // if playlist doesnt exist - means its first video so just load it
        if (!youtubePlayer.current.getPlaylist()) {
          youtubePlayer.current.loadPlaylist(queue);
        }

      })
    }
  }, []);

  // Data gives access to the video time when clicking scroll bar
  function handleAction(action, data) {
    if (socketRef.current) {
      socketRef.current.emit('videoAction', { type: action, data })
    }
  }

  function handleVideoTime(data) {
    if (socketRef.current) {
      socketRef.current.emit('videoTime', data)
    }
  }

  function receivedMessage(message) {
    setMessages(oldMsgs => [...oldMsgs, message]);
  }

  function leaveRoom() {
    socketRef.current.close();
    setRedirect('/');
  }

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      body: message,
      id: yourID,
    };
    setMessage("");
    socketRef.current.emit("send message", messageObject);
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window.onYouTubeIframeAPIReady = loadVideoPlayer;
  }, []);

  function loadVideoPlayer() {
    const player = new window.YT.Player('player', {
      height: '90%',
      videoId: "xq0CpI-Zfeg",
      playerVars: { 'autoplay': 1, 'controls': 1, 'playlist': queue.join(',') },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }

    });
    youtubePlayer.current = player;

  }
  function onPlayerReady(event) {
    socketRef.current.emit('requestVideoInfo', "");
  }
  function onPlayerStateChange(event) {
    // console.log("event change", event)
    // if (onStateChangeFunc) {
    //   onStateChangeFunc(event)
    // }
    console.log("state change fired", event.data)

    if (event.data === 0 || event.data === -1) {

      let index = youtubePlayer.current.getPlaylistIndex();

      if (youtubePlayer.current.getPlaylist().length !== queue.length) {
        // update playlist and start playing at the proper index
        youtubePlayer.current.loadPlaylist(queue, index + 1);
      }
    }
  }
  function toggleChat() {
    if (chatState === "open") {
      setChatState("closed")
    } else {
      setChatState("open")
    }
  }

  if (redirect) {
    return <Redirect to={redirect} />
  }

  function addVideoToQueue(videoId) {
  
    socketRef.current.emit('addVideo', videoId);

  }

  return (
    <div className="chat-container">

      <div className="player-with-controls"><div id="player" className={chatState === "open" ? 'youtube-player' : 'youtube-player-expanded'} />
        <div>
        
          <Controls videoProgress={videoProgress} handleAction={handleAction} handleVideoTime={handleVideoTime}/>
          <QueueForm addVideoToQueue={addVideoToQueue} />
        </div>
      </div>
      <div className="leave-room">
        <LeaveRoom leaveRoom={leaveRoom} />
      </div>
      <div className="toggle-chat">
        <PlayCircleFilledWhiteIcon onClick={toggleChat} fontSize="large" classes={{ root: 'toggle-button' }} />
      </div>
      {chatState === "open" &&

        <div className="text-chat-expanded">
          <div>
            <Container socket={socketRef.current}>
              {messages.map((message, index) => {
                if (message.id === yourID) {
                  return (
                    <MyRow key={index}>
                      <Message message={message} />
                    </MyRow>
                  )
                }
                return (
                  <PartnerRow key={index}>
                    <Message message={message} />
                  </PartnerRow>
                )
              })}
            </Container>
            <Form onSubmit={sendMessage}>
              <TextArea value={message} onChange={handleChange} placeholder="Say something..." />
              <Button>Send</Button>
            </Form>
          </div>
        </div>
      }

    </div>

  )
}