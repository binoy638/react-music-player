import React, { useState, useRef, useEffect } from "react";
import YouTube from "react-youtube";
import {
  faPlay,
  faBackward,
  faForward,
  faPause,
  faVolumeUp,
  faRandom,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Player({ videoId, songinfo }) {
  useEffect(() => {}, []);

  const [isPlaying, setisPlaying] = useState(false);
  const [currentTime, setcurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const playerRef = useRef(null);
  const opts = {
    height: "0",
    width: "0",

    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  let songduration;
  const _onReady = (event) => {
    // event.target.playVideo();
    // access to player in all event handlers via event.target
    console.log(event);
    // var d = event.target.getCurrentTime();
    // console.log(d / 60);
    const c = event.target.getDuration();
    console.log(c);
    setDuration(c);

    // console.log(c);
    // console.log(d);

    console.log(playerRef);

    // console.log("songduration");
    // console.log(songduration);
  };

  // const dragHandler = (e) => {
  //   audioRef.current.currentTime = e.target.value;
  //   setSongInfo({ ...songInfo, currentTime: e.target.value });
  // };

  const isplayinghandler = () => {
    if (isPlaying) {
      playerRef.current.internalPlayer.pauseVideo();
    } else {
      playerRef.current.internalPlayer.playVideo();
    }
  };
  const playerStateHandler = (e) => {
    if (e.data === 0 || e.data === 2) {
      setisPlaying(false);
    } else if (e.data === 1 || e.data === 3) {
      setisPlaying(true);
      // setcurrentTime((count) => count + 1);
    }
  };

  const dragHandler = () => {
    setInterval(() => {
      setcurrentTime((count) => count + 1);
    }, 1000);
  };

  const seekHandler = (e) => {
    let time = e.target.value;
    playerRef.current.internalPlayer.seekTo(time);
    setcurrentTime(time);
  };

  return (
    <div>
      <div className="song-container">
        <img src={songinfo.image} alt={songinfo.track} />
      </div>
      <div className="song-info">
        <h2>{songinfo.track}</h2>
        <h3>{songinfo.artist}</h3>
      </div>
      <div className="ytplayer">
        <YouTube
          videoId={videoId}
          opts={opts}
          // onPlayerReady={() => {
          //   console.log("ready");
          // }}
          onReady={_onReady}
          onTimeUpdate={() => console.log("hi")}
          onStateChange={(e) => playerStateHandler(e)}
          // onPlay={() => {
          //   console.log(duration);
          // }}
          // onPlaybackRateChange={(e) => console.log(e.target.value)}
          ref={playerRef}
        />
      </div>
      <div className="player">
        <div className="play-control">
          <input
            min={0}
            max={duration}
            onChange={seekHandler}
            value={currentTime}
            type="range"
          />
          <FontAwesomeIcon
            className="skip-back"
            size="2x"
            style={{ cursor: "pointer" }}
            icon={faBackward}
          />
          <FontAwesomeIcon
            className="play"
            style={{ cursor: "pointer" }}
            size="2x"
            icon={isPlaying ? faPause : faPlay}
            onClick={() => {
              isplayinghandler();
            }}
          />
          <FontAwesomeIcon
            className="skip-forward"
            size="2x"
            icon={faForward}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Player;
