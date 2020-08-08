import React, { useState, useEffect, useRef } from "react";

import './Controls.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

export default function Controls(props) {
  const scrollBar = useRef()

  const [muted, setMuted] = useState(false)

  useEffect(() => {
    scrollBar.current.value = props.videoProgress
  }, [props.videoProgress])

  return (
    <>
      <input type="range" id="progress-bar" class="progress-bar" ref={scrollBar}
        onMouseUp={e => props.handleAction("scroll-video", {timePercentage: e.target.value})}
        onChange={e => {props.handleVideoTime({timePercentage: e.target.value})}}
      />
      <div className="controls">
        {!muted && <VolumeMuteIcon
          onClick={() => {
            props.handleAction("mute")
            setMuted(true)
          }}
          fontSize="large">
        </VolumeMuteIcon>}
        {muted && <VolumeOffIcon
          onClick={() => {
            props.handleAction("unmute")
            setMuted(false)
          }}
          fontSize="large">
        </VolumeOffIcon>}
        <input type="range" class="volume-bar" onMouseUp={e => props.handleAction("scroll-volume", {volumePercentage: e.target.value})}/>
        <PlayArrowIcon className="play" onClick={() => { props.handleAction("play") }} fontSize="large"></PlayArrowIcon>
        <StopIcon className="stop" onClick={() => { props.handleAction("pause") }} fontSize="large"></StopIcon>
        <SkipNextIcon className="mute" onClick={() => { props.handleAction("nextVideo") }} fontSize="large"></SkipNextIcon>
      </div>
    </>
  )
}
