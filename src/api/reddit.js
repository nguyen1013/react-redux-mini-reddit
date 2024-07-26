export const API_URL = "http://www.reddit.com";

export const getSubreditPosts = async (subreddit) => {
  fetch(`${API_URL}/${subreddit}.json?raw_json=1`, { mode: "no-cors" })
    .then((response) => response.json)
    .then((json) => {
      return json.data.children.map((post) => post.data);
    });
};

export const getSubredits = async () => {
  fetch(`${API_URL}/subreddits.json?raw_json=1`, { mode: "no-cors" })
    .then((response) => response.json)
    .then((json) => {
      return json.data.children.map((post) => post.data);
    });
};

export const getPostComments = async (permalink) => {
  fetch(`${API_URL}${permalink}.json?raw_json=1`, { mode: "no-cors" })
    .then((response) => response.json)
    .then((json) => {
      return json[1].data.children.map((post) => post.data);
    });
};
