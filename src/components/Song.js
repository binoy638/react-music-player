import React from "react";

const Song = ({ currentSong, isPlaying }) => {
  return (
    <div>
      <div className="song-container">
        <img src={currentSong.cover} alt={currentSong.name} />

        <div
          className={`${isPlaying ? "circle animation-active" : "circle"}`}
          style={{
            backgroundColor: `${currentSong.color[0]}`,
          }}
        ></div>
        <div
          className={`${isPlaying ? "circle animation-active" : "circle"}`}
          style={{
            animationDelay: "-3s",
            backgroundColor: `${currentSong.color[0]}`,
          }}
        ></div>
        <div
          className={`${isPlaying ? "circle animation-active" : "circle"}`}
          style={{
            animationDelay: "-2s",
            backgroundColor: `${currentSong.color[0]}`,
          }}
        ></div>
        <div
          className={`${isPlaying ? "circle animation-active" : "circle"}`}
          style={{
            animationDelay: "-1s",
            backgroundColor: `${currentSong.color[0]}`,
          }}
        ></div>
        <div
          className={`${isPlaying ? "circle animation-active" : "circle"}`}
          style={{
            animationDelay: "0s",
            backgroundColor: `${currentSong.color[0]}`,
          }}
        ></div>
      </div>
      <div className="song-info">
        <h2>{currentSong.name}</h2>
        <h3>{currentSong.artist}</h3>
      </div>
    </div>
  );
};

export default Song;
