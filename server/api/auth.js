import { Router } from "express";

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

apiAuthRouter.post("/login", (req, res) => {
  // 등록된 정보와 입력된 아이디 또는 패스워드가 틀린 경우
  if (
    users.some(
      (u) => u.userId == req.body.id && u.password == req.body.password
    )
  ) {
    res.send(true);
  } else {
    res.send(false);
  }
});

apiAuthRouter.get("/:userId", (req, res) => {
  function filterYourId(item){
    if (item.userId != req.params.userId){
      return true;
    }
    return false;
  }

  if (users.some((u) => u.userId == req.params.userId)) {
    res.send(users.filter(filterYourId));
  } else res.send(false);
});

export default apiAuthRouter;
