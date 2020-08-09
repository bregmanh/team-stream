import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import io from "socket.io-client";
import "./Chat.css";
import Controls from "./Controls";
import QueueForm from "./QueueForm";
import CopyLink from "./CopyLink";
import InviteFriendsModal from "./InviteFriendsModal";
import VerticalNav from "../components/VerticalNav";
import ChatAside from "../components/ChatAside";



export default function Chat(props) {


  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [toggleState, setToggleState] = useState('');
  const [asideSelection, setAsideSelection] = useState('chat');
  const [inviteFriendsModal, setInviteFriendsModal] = useState(false);
  const [canControl, setCanControl] = useState(true)
  const youtubePlayer = useRef();

  let queue = [];
  const bufferTime = 4.5;
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
        const threshold = 0.9;
        receivedMessage(message);

      })

      socketRef.current.on("videoAction", ({ action, hostInfo }) => {
        if (action.type === 'scroll-video') {
          const newTime = youtubePlayer.current.getDuration() * action.data.timePercentage / 100
          youtubePlayer.current.seekTo(newTime)
          setVideoProgress(action.data.timePercentage)
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
      // socketRef.current.on("videoTime", (time) => {
        // youtubePlayer.current.seekTo(newTime)
      //   console.log('what time should be as video plays', time.action.timePercentage)
      //   setVideoProgress(time.action.timePercentage)
      // })

      socketRef.current.on("session closed", () => {
       
        setRedirect('/rooms/closed');
      })
      socketRef.current.on("inviteFriends", () => {
        openModal()
      })

      socketRef.current.on("provideVideoInfo", (hostInfo) => {
        // const startTime = new Date().getTime();
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

      socketRef.current.emit("can-control")

      socketRef.current.on("show-controls", (canControl) => {
        setCanControl(canControl)
      })
    }
  }, []);

  // Data gives access to the video time when clicking scroll bar
  function handleAction(action, data) {
    if (socketRef.current) {
      socketRef.current.emit('videoAction', { type: action, data })
    }
  }

  function handleVolume(action, data) {
    if (action === 'scroll-volume') {
      youtubePlayer.current.setVolume(data.volumePercentage)
    }
    if (action === 'mute') {
      youtubePlayer.current.mute()
    }
    if (action === 'unmute') {
      youtubePlayer.current.unMute()
    }
  }

  // function handleVideoTime(data) {
  //   if (socketRef.current) {
  //     socketRef.current.emit('videoTime', data)
  //   }
  // }

  function receivedMessage(message) {
    setMessages(oldMsgs => [...oldMsgs, message]);
    if (document.getElementById('text-chat')) {
      document.getElementById('text-chat').scrollTop = 552;
    }
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
    if (document.getElementById('text-chat')) {

      document.getElementById('text-chat').scrollTop = 552;
    }

  }

  function handleChange(e) {
    setMessage(e.target.value);
  }

  useEffect(() => {
    const tag = document.createElement('script');
    tag.id="iframe"
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window.onYouTubeIframeAPIReady = loadVideoPlayer;
  }, []);

  function loadVideoPlayer() {
    const player = new window.YT.Player('player', {
      height: '90%',
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

  function toggleAside() {
    if (toggleState === '') {
      setToggleState('hidden');
    } else {
      setToggleState('');
    }
  };

  function selectAside(selection) {
    if (selection === asideSelection) {
      setAsideSelection("");
      setToggleState('hidden');
    } else if (!asideSelection) {
      setToggleState('')
      setAsideSelection(selection);
    } else {
      setAsideSelection(selection);
    }
  }

  if (redirect) {
    return <Redirect to={redirect} />
  }

  // function addVideoToQueue(videoId) {
  //   socketRef.current.emit('addVideo', videoId);
  // }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(function () {
      console.log(`copied the following url: ${window.location.href}`);
    }, function () {
      console.log("clipboard copy failed")
    });
  }

  const openModal = () => {
    setInviteFriendsModal(true);
  };

  const closeModal = () => {
    setInviteFriendsModal(false);
  };

  return (
    <div className="chat-container">
      <InviteFriendsModal open={inviteFriendsModal} closeModal={closeModal} copyLink={copyLink} />
      {/* TO DO: FIX CLASS NAME DOWN HERE*/}
      <div className="player-with-controls">
        <div id="player" className={toggleState === "hidden" ? 'youtube-player-expanded' : 'youtube-player'} />
        <div>
          <Controls canControl={canControl} videoProgress={videoProgress} handleAction={handleAction} handleVolume={handleVolume}/>
        </div>
      </div>
      <ChatAside socketRef={socketRef} copyLink={copyLink} yourID={yourID} message={message} setMessage={setMessage} messages={messages} sendMessage={sendMessage} leaveRoom={leaveRoom} toggleState={toggleState} selection={asideSelection} room={room} />
      <VerticalNav toggleAside={toggleAside} selectAside={selectAside} selection={asideSelection} />
    </div>

  )
}