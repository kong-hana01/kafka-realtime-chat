import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { WebSocketServer } from "ws";

import bodyParser from "body-parser";
import session from "express-session";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(
  session({ secret: "keyboard cat", cookie: { maxAge: 1000 * 60 * 60 } })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// login 기능 임시 구현
let users = new Array();
users[0] = {
  userId: 1,
  password: "1",
};

app.get("/login", (req, res) => {
  res.render(__dirname + "/login.ejs", { session: req.session });
});

app.post("/login", (req, res) => {
  // 로그아웃버튼을 누른 경우
  if (req.session.userId) {
    req.session.destroy(function (err) {});
    res.redirect("/");
    return true;
  }

  // 등록된 정보와 입력된 아이디 또는 패스워드가 틀린 경우
  if (
    !users.some(
      (u) => u.userId == req.body.id && u.password == req.body.password
    )
  ) {
    // res.send("아이디 또는 비밀번호를 잘못 입력했습니다. \n입력하신 내용을 다시 확인해주세요.");
    res.redirect("/login");
    return false;
  }

  req.session.userId = req.body.id;
  req.session.save(function () {
    res.redirect("/");
  });
  return true;
});
