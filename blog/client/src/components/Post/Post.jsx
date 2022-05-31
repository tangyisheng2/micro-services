import CommentCreate from "../Comment/CommentCreate";
import Comment from "../Comment/Comment";

function Post({ post }) {
  return (
    <div className="post">
      <h3>{post.title}</h3>
      <hr />
      <Comment postId={post.id} comments={post.comments} />
    </div>
  );
}
export default Post;

// {"d7bf07a5":{"id":"d7bf07a5","title":"Hello2","comments":[]}}
