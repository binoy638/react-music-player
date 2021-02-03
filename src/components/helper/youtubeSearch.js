import search from "youtube-search";
const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
var opts = {
  type: "video",
  maxResults: 1,
  videoCategoryId: "10",
  key: API_KEY,
};

export const getVideoId = async (query) => {
  const ID = await search(query, opts);
  if (ID.results) {
    return ID.results[0].id;
  }
  return null;
};
