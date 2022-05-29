import express from "express";
import bodyParser from "body-parser";
import acios from "axios";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const { type, payload } = req.body;
  console.log("event received: ", payload);

  if (type === "CommentCreated") {
    const status = payload.content.includes("orange") ? "rejected" : "approved";

    axios.post('http://localhost:4005/events', {
        type: 'CommentModerated',
        payload: {
            id:payload.id,
            postId: payload.postId,
            status,
            content: payload.content
        }
    })
  }
});

app.listen(4003, () => console.log("Listening on 4003"));
