import axios from "axios";
import { useState } from "react";
import {ENDPOINT} from '../../constant/Backend'

function CommentCreate({ postId }) {
  const [newComment, setNewComment] = useState("");
  const submitForm = (postId) => {
    console.log("submit", postId, newComment);
    return axios
      .post(`${ENDPOINT}/posts/${postId}/comments`, {
        content: newComment,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div className="comment-create">
      <form
        className="comment-create__form"
        onSubmit={(e) => {
          e.preventDefault();
          submitForm(postId);
        }}
      >
        <h3>Create Comment</h3>
        <label>
          Comment
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </label>
      </form>
    </div>
  );
}
export default CommentCreate;
