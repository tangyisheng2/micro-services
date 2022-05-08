import express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.post("/events", (req, res) => {
  console.log("posts - Comments Received", req.body);
  res.send({});
});

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");

  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments;

  axios
    .post("http://localhost:4005/events", {
      type: "CommentCreated",
      payload: {
        postId: req.params.id,
        id: commentId,
        content,
      },
    })
    .catch((error) => console.log(error));

  res.status(201).send(comments);
});

app.listen(4001, () => console.log("Listening on 4001"));
