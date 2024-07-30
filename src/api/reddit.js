export const API_URL = "http://www.reddit.com";

export const getSubreditPosts = async (subreddit) => {
  const response = await fetch(`${API_URL}${subreddit}.json?raw_json=1`);
  const json = await response.json();
  const data = json.data.children.map((post) => post.data);
  console.log(`fetch getSubreditPosts: ${subreddit}`);
  return data;
};

export const getSubredits = async () => {
  const response = await fetch(`${API_URL}/subreddits.json`);
  const json = await response.json();
  const data = json.data.children.map((subreddit) => subreddit.data)
  return data;
};

export const getPostComments = async (permalink) => {
  const response = await fetch(`${API_URL}${permalink}.json?raw_json=1`);
  const json = await response.json();
  const data = json[1].data.children.map((post) => post.data);
  return data;
};

export const getSearchResults = async (query) => {
  fetch(`${API_URL}/search/.json?q=${query}type=link.json&raw_json=1`, {
    mode: "no-cors",
  })
    .then((response) => response.json)
    .then((json) => {
      return json.data.children.map((post) => post.data);
    });
};

// fetch(`${API_URL}/search/.json?q=${query}type=link.json&raw_json=1`, {
//   mode: "no-cors",
// })

// http://www.reddit.com/r/Home/comments/1eendab/drip_coming_from_shower_head/.json
