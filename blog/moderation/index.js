import express from "express";
import bodyParser from "body-parser";
import acios from "axios";

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {});

app.listen(4003, () => console.log("Listening on 4003"));
