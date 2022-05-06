import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { WebSocketServer } from "ws";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    console.log("wss message", data);
  });

  ws.send("something");
});
