import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

const handleEvent = (type, payload) => {
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

  if (type === "CommentUpdated") {
    console.log(payload);
    const { id, content, postId, status } = payload;

    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, payload } = req.body;
  console.log(req.body);

  handleEvent(type, payload);

  res.send({});
});

app.listen(4002, () => {
  console.log("Listening on 4002");
  axios
    .get("http://localhost:4005/events")
    .then((res) => {
      res.data.forEach((event) => {
        console.log(`Processing event: ${event.type}, ${event.payload}`);
        handleEvent(event.type, event.payload);
      });
    })
    .catch((err) => console.log(err));
});
