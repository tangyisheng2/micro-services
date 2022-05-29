import express from "express";
import bodyParser from "body-parser";
import acios from "axios";
<<<<<<< HEAD
import axios from "axios";
=======
>>>>>>> ae94f1e4dd36f77c02cc821dad09385869aa69af

const app = express();
app.use(bodyParser.json());

<<<<<<< HEAD
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
=======
app.post("/events", (req, res) => {});
>>>>>>> ae94f1e4dd36f77c02cc821dad09385869aa69af

app.listen(4003, () => console.log("Listening on 4003"));
