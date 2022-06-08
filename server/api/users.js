import { Router } from "express";
import { Op } from "sequelize";
import db from "../models/index.js";

const apiUsersRouter = Router();

apiUsersRouter.get("/", async (req, res) => {
  const data = (await db.Users.findAll()).map((user) => {
    return {
      username: user.username,
      id: user.id,
    };
  });

  res.send(data);
});

export default apiUsersRouter;
