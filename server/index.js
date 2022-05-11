import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { WebSocketServer } from "ws";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
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
  ws.send(JSON.stringify({ type: "sync", history: msgHistory }));

  ws.on("message", (data, isBinary) => {
    try {
      const payload = JSON.parse(data);
      console.log("payload: ", payload);
    } catch (SyntaxError) {
      console.log("invalid payload: ", data.toString());
    }
  });
});
