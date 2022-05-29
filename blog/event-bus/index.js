import express, { application } from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;

  console.log(req.body);

  axios
    .post("http://localhost:4000/events", event)
    .catch((e) => console.log("Posts Service", e.message));
  axios
    .post("http://localhost:4001/events", event)
    .catch((e) => console.log("Comment Service", e.message));
  axios
    .post("http://localhost:4002/events", event)
    .catch((e) => console.log("Service", e.message));
  axios
    .post("http://localhost:4003/events", event)
    .catch((e) => console.log("Service", e.message));

  res.send({ status: "OK" });
});

app.listen(4005, () => console.log("Listening on 4005"));
