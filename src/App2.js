// import { useEffect, useRef } from "react";

import Ytsearch from "./components/YT/Search";
import Player from "./components/YT/Player";
import { useState } from "react";
import "./styles/app.scss";
function App2() {
  const [videoId, setvideoId] = useState("5yx6BWlEVcY");
  const [songinfo, setsonginfo] = useState({
    image: "https://i.scdn.co/image/ab67616d0000b27346ede1ec400aab47452526d6",
    track: "Lofi Beats",
    artist: "Chill Hops",
  });
  return (
    <div>
      <Player videoId={videoId} songinfo={songinfo} />
      <Ytsearch
        setvideoId={setvideoId}
        setsonginfo={setsonginfo}
        songinfo={songinfo}
      />
    </div>
  );
}

export default App2;
