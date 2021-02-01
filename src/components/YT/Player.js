import React, { useState, useRef } from "react";
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
function Player({ videoId }) {
  const [isPlaying, setisPlaying] = useState(false);
  const [currentTime, setcurrentTime] = useState(0);
  const playerRef = useRef(null);
  const opts = {
    height: "390",
    width: "640",

    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  let songduration;
  const _onReady = (event) => {
    // access to player in all event handlers via event.target
    console.log(event);
    var d = event.target.getDuration() / 60;
    console.log(d / 60);
    var c = event.target.getCurrentTime();
    console.log(c);
    console.log(event.target);

    console.log(playerRef);
    songduration = d;
    console.log("songduration");
    console.log(songduration);
  };

  // const dragHandler = (e) => {
  //   audioRef.current.currentTime = e.target.value;
  //   setSongInfo({ ...songInfo, currentTime: e.target.value });
  // };

  const isplayinghandler = () => {
    if (isPlaying) {
      playerRef.current.internalPlayer.pauseVideo();
      setisPlaying(!isPlaying);
    } else {
      playerRef.current.internalPlayer.playVideo();
      setisPlaying(!isPlaying);
    }
  };

  return (
    <div>
      <h1>YT Video</h1>
      <div className="ytplayer">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={_onReady}
          // onTimeUpdate={() => console.log("hi")}
          onStateChange={(e) => console.log(e.data)}
          // onPlaybackRateChange={(e) => console.log(e.target.value)}
          ref={playerRef}
        />
      </div>
      <div className="play-control">
        <input
          min={0}
          max={songduration || 0}
          // onChange={dragHandler}
          value={5}
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
  );
}

export default Player;
