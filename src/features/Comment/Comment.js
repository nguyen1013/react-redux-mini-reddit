import React from "react";
import { format, fromUnixTime } from "date-fns";
import ReactMarkdown from "react-markdown";

function Comment(props) {
  const { comment } = props;

  return (
    <div>
      <p>{comment.author}</p>
      <ReactMarkdown source={comment.body} />
    </div>
  );
}

export default Comment;
