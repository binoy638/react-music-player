import React from "react";
import YouTube from "react-youtube";

function Player({ videoId }) {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  const _onReady = (event) => {
    // access to player in all event handlers via event.target
    var d = event.target.getDuration();
    console.log(d / 60);
    var c = event.target.getCurrentTime();
    console.log(c);
    console.log(event.target);
  };
  return (
    <div>
      <h1>YT Video</h1>
      <div className="ytplayer">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={_onReady}
          onStateChange={(e) => console.log(e.target.getCurrentTime())}
          onPlaybackRateChange={(e) => console.log(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Player;
