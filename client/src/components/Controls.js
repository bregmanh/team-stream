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
    <div className="all-controls">
      {props.canControl &&
        <input type="range" id="progress-bar" class="progress-bar" ref={scrollBar}
        onInput={e => props.handleAction("scroll-video", {timePercentage: e.target.value})}
        // onChange={e => {props.handleVideoTime({timePercentage: e.target.value})}}
        />
      }
      {!props.canControl && <div className="no-scroll-padding"></div>}
      <div className="controls">
        {!muted && <VolumeMuteIcon
          onClick={() => {
            props.handleVolume("mute")
            setMuted(true)
          }}
          fontSize="large">
        </VolumeMuteIcon>}
        {muted && <VolumeOffIcon
          onClick={() => {
            props.handleVolume("unmute")
            setMuted(false)
          }}
          fontSize="large">
        </VolumeOffIcon>}
        <input type="range" class="volume-bar" onInput={e => props.handleVolume("scroll-volume", {volumePercentage: e.target.value})}/>
        {props.canControl &&
          <div className="global-controls">
            <PlayArrowIcon className="play" onClick={() => { props.handleAction("play") }} fontSize="large"></PlayArrowIcon>
            <StopIcon className="stop" onClick={() => { props.handleAction("pause") }} fontSize="large"></StopIcon>
            <SkipNextIcon className="mute" onClick={() => { props.handleAction("nextVideo") }} fontSize="large"></SkipNextIcon>
          </div>
        }
      </div>
    </div>
  )
}
