import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { WebSocketServer } from "ws";

import bodyParser from "body-parser";
import session from "express-session";

import apiAuthRouter from "./api/auth.js";
import { getMsgHistory } from "./chat/index.js";
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// const port = 3000;
const port = 5000;

app.use(
  session({ secret: "keyboard cat", cookie: { maxAge: 1000 * 60 * 60 } })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use("/apiAuthRouter", apiAuthRouter);

app.use(cors({ origin: 'http://localhost:3000'}));

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.sendFile(path.join(__dirname + "/view/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const wss = new WebSocketServer({ port: 3001 });

const msgHistory = [
  {
    type: "msg",
    id: "asdf1",
    timestamp: "2020-01-01 00:00:00",
    text: "Hello, world!",
  },
  {
    type: "msg",
    id: "asdf2",
    timestamp: "2020-01-02 00:00:00",
    text: "Hello2 world! End of Sync",
  },
];

wss.on("connection", (ws) => {
  const init = async () => {
    await getMsgHistory("test-room2", (msg) => {
      ws.send(JSON.stringify({ type: "receive_msg", ...msg }));
    });
  };
  init();

  ws.on("message", (data, isBinary) => {
    try {
      const payload = JSON.parse(data);
      console.log("payload: ", payload);
    } catch (SyntaxError) {
      console.log("invalid payload: ", data.toString());
    }
  });
});

app.get("/login", (req, res) => {
  res.render(__dirname + "/view/login.ejs", { session: req.session });
});

app.use("/api/auth", apiAuthRouter);

export default app;
