import React, { useRef } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faBackward,
  faForward,
  faPause,
  faVolumeUp,
  faRandom,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  setCurrentSong,
  songs,
  setSongs,
}) => {
  const [shuffle, setShuffle] = useState(false);
  const audioRef = useRef(null);
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration });
  };
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const autoPlayHandler = () => {
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  const skipTrack = (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let newIndex = currentIndex + direction;
    if (newIndex < 0) {
      newIndex = songs.length - 1;
    } else if (newIndex >= songs.length) {
      newIndex = 0;
    }
    setCurrentSong(songs[newIndex]);
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const songendedHandler = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let newIndex = currentIndex + 1;
    if (newIndex >= songs.length) {
      newIndex = 0;
    }
    if (shuffle) {
      newIndex = 2;
    }
    setCurrentSong(songs[newIndex]);
  };
  const shuffleHandler = () => {
    setShuffle(!shuffle);
  };
  const volumeHandler = (e) => {
    let volume = e.target.value / 100;
    audioRef.current.volume = volume;
  };
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            onChange={dragHandler}
            value={songInfo.currentTime}
            type="range"
          />
          <div
            className="animate-track"
            style={{
              transform: `translateX(${
                (songInfo.currentTime / songInfo.duration) * 100
              }%)`,
            }}
          ></div>
        </div>
        <p>{getTime(songInfo.duration || 0)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="volume"
          style={{ cursor: "pointer" }}
          size="1x"
          icon={faVolumeUp}
        />
        <input min={0} max={100} type="range" onClick={volumeHandler} />
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          style={{ cursor: "pointer" }}
          icon={faBackward}
          onClick={() => skipTrack(-1)}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          style={{ cursor: "pointer" }}
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faForward}
          style={{ cursor: "pointer" }}
          onClick={() => skipTrack(1)}
        />
        <FontAwesomeIcon
          className="random"
          style={{ cursor: "pointer", color: `${shuffle ? "green" : "white"}` }}
          onClick={shuffleHandler}
          size="1x"
          icon={faRandom}
        />
      </div>
      <audio
        onLoadedData={autoPlayHandler}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songendedHandler}
      ></audio>
    </div>
  );
};

export default Player;
