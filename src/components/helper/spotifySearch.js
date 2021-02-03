import SpotifyWebApi from "spotify-web-api-node";

var spotifyApi = new SpotifyWebApi();

export const spotifySearch = async (accessToken, query) => {
  spotifyApi.setAccessToken(accessToken);
  var response = await spotifyApi.searchTracks(query, { limit: 1, offset: 0 });

  if (response.statusCode === 200) {
    if (response.body.tracks.items.length === 0) {
      return null;
    }

    const artist = response.body.tracks.items[0].artists[0].name;
    const artistsarray = response.body.tracks.items[0].artists;

    const artists = artistsarray.map((artist) => {
      return artist.name;
    });

    const track = response.body.tracks.items[0].name;
    const image = response.body.tracks.items[0].album.images[0].url;
    const search_query = `${artist} ${track}`;

    return {
      artist: artists.join(),
      track: track,
      image: image,
      search_query: search_query,
    };
  } else {
    return "token expired";
  }
};
