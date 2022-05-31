function CommentList({ comments }) {
  return (
    <ul className="comment__list">
      {comments.map !== undefined &&
        comments.map((entry) => <li key={entry.id}>{entry.content}
        {entry.status === 'rejected' && '(rejected)'}
        {entry.status === 'pending' && '(pending)'}
        </li>)}
    </ul>
  );
}
export default CommentList;
