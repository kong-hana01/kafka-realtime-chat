import { Router } from "express";
import db from "../models/index.js";

const apiAuthRouter = Router();

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

apiAuthRouter.put("/login", async (req, res) => {
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
