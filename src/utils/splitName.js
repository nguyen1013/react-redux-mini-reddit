// Example usage:
// console.log(formatSubredditName('/r/AskReddit/')); // Output: "Ask Reddit"


function splitName(input) {
  // Step 1: Extract text after '/r/'
  const match = input.match(/\/r\/(.+)/);
  if (!match) return null; // Return null if no match found
  // Step 2: Split by uppercase characters and join with space
  const subredditName = match[1]
    .split(/(?=[A-Z])/)
    .join(' ')
    .trim();

  return subredditName;
}
export default splitName;



export function splitUserName(input) {

  const parts = input.split(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/);
  console.log(parts)
  
  // Join the parts with spaces, trim any extra whitespace, and convert to lowercase
  return parts.join(' ').trim();
}


