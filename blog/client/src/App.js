import "./App.css";
import PostCreate from "./components/Post/PostCreate";
import PostList from "./components/Post/PostList";

function App() {
  return (
    <div className="App container">
      <h2>Create Post</h2>
      <PostCreate />
      <hr />
      <h2>Post List</h2>
      <PostList />
    </div>
  );
}

export default App;
