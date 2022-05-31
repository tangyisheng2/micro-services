import axios from "axios";
import { useEffect, useState } from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

function Comment({ postId, comments }) {
  // const fetchCommentForPostId = (postId) => {
  //   axios.get(`http://localhost:4001/posts/${postId}/comments`).then((res) => {
  //     const data = res.data;
  //     console.log(res);
  //     setFetchedComments(data);
  //   });
  // };
  // const [fetchedComments, setFetchedComments] = useState({})

  // useEffect(() => {
  //   fetchCommentForPostId(postId);
  // }, []);
  return (
    <div className="comment">
      <CommentCreate postId={postId} />
      <hr />
      {/* <CommentList comments={fetchedComments} /> */}
      <CommentList comments={comments} />
    </div>
  );
}
export default Comment;
