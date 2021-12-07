import React, { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Player = (props) => {
  // console.log(props)
  const audioRef = useRef(null);

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

  return (
    <div className='player'>
      <div className='time-control'>
        <p>Start Time</p>
        <input type='range' />
        <p>End Time</p>
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
      <audio ref={audioRef} src={props.currentSong.audio}></audio>
    </div>
  )
}

export default Player;