import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Player = (props) => {
  // console.log(props)
  const audioRef = useRef(null);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    currentDuration: 0
  });

  const timeUpdateHandler = (e) => {
    // console.log(e);
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // console.log(current)
    setSongInfo({...songInfo, currentTime: current, currentDuration: duration })
  }

  const playSongHandler = () => {
    // console.log(audioRef)
    if (props.isPlaying) {
      audioRef.current.pause();
      props.setIsPlaying(!props.isPlaying)
    } else {
      audioRef.current.play();
      props.setIsPlaying(!props.isPlaying)
    }
  }

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    )
  }

  const dragHandler = (e) => {
    // console.log(e.target.value)
    audioRef.current.currentTime = e.target.value;
    setSongInfo({...songInfo, currentTime: e.target.value })
  }

  return (
    <div className='player'>
      <div className='time-control'>
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type='range'
        />
        <p>{getTime(songInfo.currentDuration)}</p>
      </div>
      <div className='play-control'>
        <FontAwesomeIcon
          className='skip-back'
          size='2x'
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className='play'
          size='2x'
          icon={!props.isPlaying ? faPlay : faPause}
        />
        <FontAwesomeIcon
          className='skip-forward'
          size='2x'
          icon={faAngleRight}
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={props.currentSong.audio}></audio>
    </div>
  )
}

export default Player;