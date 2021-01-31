// import { useEffect, useRef } from "react";

import Ytsearch from "./components/YT/Search";
import Player from "./components/YT/Player";
import { useState } from "react";

function App2() {
  const [videoId, setvideoId] = useState("T3bxbVGWy5k");
  return (
    <div>
      <Player videoId={videoId} />
      <Ytsearch setvideoId={setvideoId} />
    </div>
  );
}

export default App2;
