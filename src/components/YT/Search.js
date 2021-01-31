import { useState, useEffect } from "react";

// var SpotifyWebApi = require("spotify-web-api-node");
// var spotifyApi = new SpotifyWebApi();
// spotifyApi.setAccessToken(
//   "BBQBpAkI34DoerlUhWu0JnmPQbU271Et9XMsd-kBlUtcWq2kKyYZ2Ks_9vRE6PEkgxBpgZWu7mdiV2H7W4UcbA8mFpvyx3y33C4OWSMzpchw-7Qh1_kNnxK-yfJF57zoCI522PEvqhT9TXKqZd54Bw4o94s39Wbhb7cM"
// );
// console.log("hi");
// spotifyApi.searchTracks("Love").then(
//   function (data) {
//     console.log('Search by "Love"', data.body);
//   },
//   function (err) {
//     console.error(err);
//   }
// );
var search = require("youtube-search");
var opts = {
  type: "video",
  maxResults: 1,
  videoCategoryId: "10",
  key: "AIzaSyDOxNOC4DNi8rGajm1GMfHcsOAXVAsH3GM",
};
function Search({ setvideoId }) {
  const [query, setQuery] = useState("");
  const getSearchResult = (q) => {
    search(q, opts, function (err, results) {
      if (err) return console.log(err);
      console.log(results);
      setvideoId(results[0].id);
    });
  };
  const spotifysearch = () => {};
  const inputval = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <h1>Yt search</h1>
      <input type="text" onChange={inputval} />
      <button onClick={() => getSearchResult(query)}>search</button>
      {/* <button onClick={() => spotifysearch}> spotify </button> */}
    </div>
  );
}

export default Search;
