import express from "express";
import path from "path";
import url from "url";
import { fileURLToPath } from "url";

import { WebSocketServer } from "ws";

import bodyParser from "body-parser";
import session from "express-session";

import apiAuthRouter from "./api/auth.js";
import { getMsgHistory, sendMsg } from "./chat/index.js";
import cors from "cors";
import { getRoomId } from "./chat/room.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5050;

app.use(
  session({ secret: "keyboard cat", cookie: { maxAge: 1000 * 60 * 60 } })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use("/apiAuthRouter", apiAuthRouter);

app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.sendFile(path.join(__dirname + "/view/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", (ws, req) => {
  const init = async () => {
    ws.location = req.url.split("?")[1];

    const { senderId, receiverId } = url.parse(req.url, true).query;

    await getMsgHistory(getRoomId(senderId, receiverId), (msg) => {
      ws.send(JSON.stringify({ type: "receive_msg", ...msg }));
    });
  };
  init();

  ws.on("message", (data, isBinary) => {
    try {
      let payload = JSON.parse(data);

      if (payload.type === "send_msg") {
        const { senderId, receiverId, text } = payload;

        const roomId = getRoomId(senderId, receiverId);
        sendMsg(senderId, receiverId, roomId, text);
      }
    } catch (SyntaxError) {
      console.log("invalid payload: ", data.toString());
    }
  });
});

app.use("/api/auth", apiAuthRouter);

export default app;
