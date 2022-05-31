import axios from "axios";
import { useEffect, useState } from "react";
import Post from "./Post";
import {ENDPOINT} from '../../constant/Backend'

function PostList() {
  const fetchPosts = () => {
    axios.get(`${ENDPOINT}:4002/posts`).then((res) => {
      console.log(res.data)
      setPosts(res.data);
    });
  };
  const [posts, setPosts] = useState({});
  useEffect(fetchPosts, []);

  const renderedPosts = Object.keys(posts).map((entry) => {
    return <Post post={posts[entry]} key={entry} />;
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
}
export default PostList;
