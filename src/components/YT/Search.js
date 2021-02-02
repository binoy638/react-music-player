import { useState, useEffect } from "react";
import { getAuth } from "../helper/spotify_access_token";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

var SpotifyWebApi = require("spotify-web-api-node");
var spotifyApi = new SpotifyWebApi();

var search = require("youtube-search");
const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
var opts = {
  type: "video",
  maxResults: 1,
  videoCategoryId: "10",
  key: API_KEY,
};
function Search({ setvideoId, setsonginfo, songinfo }) {
  const [accesstoken, setAccessToken] = useState("");
  const [query, setQuery] = useState("");
  const setytvideoid = (q) => {
    search(q, opts, function (err, results) {
      if (err) return console.log(err);
      console.log(results);
      setvideoId(results[0].id);
    });
  };
  useEffect(() => {
    async function getacctk() {
      const token = await getAuth();
      setAccessToken(token);
    }
    getacctk();
  }, []);
  const spotifysearch = (query) => {
    console.log(`accesstoken:${accesstoken}`);
    spotifyApi.setAccessToken(accesstoken);
    spotifyApi.searchTracks(query, { limit: 1, offset: 0 }).then(
      function (data) {
        const artist = data.body.tracks.items[0].album.artists[0].name;
        const track = data.body.tracks.items[0].name;
        const image = data.body.tracks.items[0].album.images[0].url;
        console.log(data.body.tracks.items[0]);
        const search_query = `${artist} ${track}`;
        console.log(search_query);
        setytvideoid(search_query);
        setsonginfo({ artist: artist, track: track, image: image });
      },
      async function (err) {
        console.error(err);
        console.log("requesting new access token");
        const token = await getAuth();
        setAccessToken(token);
        // spotifysearch(query);
      }
    );
  };

  const inputval = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="player">
      <div className="searchsong">
        {/* <h1>Yt search</h1> */}
        <input type="text" onChange={inputval} />
        {/* <button onClick={() => setytvideoid(query)}>search</button> */}
        {/* <button onClick={() => spotifysearch(query)}>search</button> */}
        <FontAwesomeIcon
          size="2x"
          icon={faSearch}
          style={{ cursor: "pointer" }}
          onClick={() => spotifysearch(query)}
        />
      </div>
    </div>
  );
}

export default Search;
