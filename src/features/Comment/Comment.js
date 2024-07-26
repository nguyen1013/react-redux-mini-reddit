import React from "react";
import { format, fromUnixTime } from "date-fns";
import Markdown from "react-markdown";

function Comment(props) {
  const { comment } = props;

  return (
    <div>
      <p>{comment.author}</p>
      <p>{}</p>
    </div>
  );
}

export default Comment;
