import { Router } from "express";
import db from "../models/index.js";

const apiAuthRouter = Router();

let users = new Array();
users[0] = {
  userId: 1,
  password: "1",
};
users[1] = {
  userId: 2,
  password: "2",
};
users[2] = {
  userId: 3,
  password: "3",
};

apiAuthRouter.post("/login", async (req, res) => {
  const id = req.body.id;
  const password = req.body.password;

  const user = await db.Users.findOne({
    where: { username: id, password: password },
  });
  if (user) {
    res.send(true);
  } else {
    res.send(false);
  }
});

apiAuthRouter.post("/join", async (req, res) => {
  const id = req.body.id;
  const password = req.body.password;

  const user = await db.Users.findOne({ where: { username: id } });
  if (user) {
    res.send(false);
    return;
  }

  db.Users.create({ username: id, password: password });
  res.send(true);
});

export default apiAuthRouter;
