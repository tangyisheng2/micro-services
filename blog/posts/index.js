import express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();

const posts = {};
app.use(bodyParser.json());
app.use(cors());

app.post("/events", (req, res) => {
  console.log("posts - Event Received", req.body);
  res.send({});
});

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  axios
    .post("http://event-bus-srv:4005/events", {
      type: "PostCreated",
      payload: {
        id,
        title,
      },
    })
    .catch((error) => console.log(error));

  res.status(201).send([posts[id]]);
});

app.listen(4000, () => {
  console.log("v0.0.2");
  console.log("Listening on 4000")
});
