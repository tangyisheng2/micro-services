import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};


app.get("/posts", (req, res) => {
    res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, payload } = req.body;
  console.log(req.body)

  if (type === "PostCreated") {
    const { id, title } = payload;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = payload;

    if (postId in posts) {
      const post = posts[postId];
      post.comments.push({ id, content, status });
    }
  }
  res.send({});
});

app.listen(4002, () => console.log("Listening on 4002"));
