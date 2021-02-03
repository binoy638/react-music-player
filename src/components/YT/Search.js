import { useState, useEffect } from "react";
import { getAuth } from "../helper/spotify_access_token";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { spotifySearch } from "../helper/spotifySearch";
import { getVideoId } from "../helper/youtubeSearch";

function Search({ setvideoId, setsonginfo, songinfo }) {
  const [accesstoken, setAccessToken] = useState("");
  const [query, setQuery] = useState("");
  const searchVideoId = async (q) => {
    const videoID = await getVideoId(q);
    if (videoID) {
      setvideoId(videoID);
      console.log("changed video id");
      return true;
    }
    return false;
  };
  useEffect(() => {
    async function getAccessToken() {
      const token = await getAuth();
      setAccessToken(token);
    }
    getAccessToken();
  }, []);
  const searchHandler = async (query) => {
    const searchResult = await spotifySearch(accesstoken, query);
    if (!searchResult) {
      console.log("No result found");
    } else if (searchResult === "token expired") {
      console.log("token expired");
      const token = await getAuth();
      setAccessToken(token);
      searchHandler(query);
    } else {
      const success = await searchVideoId(searchResult.search_query);
      if (success === true) {
        setsonginfo({
          artist: searchResult.artist,
          track: searchResult.track,
          image: searchResult.image,
        });
      }
    }
  };

  const inputval = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="player">
      <div className="searchsong">
        <input type="text" onChange={inputval} />

        <FontAwesomeIcon
          size="2x"
          icon={faSearch}
          style={{ cursor: "pointer" }}
          onClick={() => searchHandler(query)}
        />
      </div>
    </div>
  );
}

export default Search;
