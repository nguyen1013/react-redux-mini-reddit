// These function is to split reddit name to readable name for Avatar component displaying
function splitName(input) {
  const match = input.match(/\/r\/(.+)/);
  if (!match) return null; // Return null if no match found
  const subredditName = match[1]
    .split(/(?=[A-Z])/)
    .join(' ')
    .trim();

  return subredditName;
}
export default splitName;
// console.log(formatSubredditName('/r/AskReddit/')); // Output: "Ask Reddit"


export function splitUserName(input) {
  const parts = input.split(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/);  
  return parts.join(' ').trim();
}
// console.log(formatSubredditName('Myname')); // Output: "My name"


