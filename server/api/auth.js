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

apiAuthRouter.post("/login", (req, res) => {
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

export default apiAuthRouter;
