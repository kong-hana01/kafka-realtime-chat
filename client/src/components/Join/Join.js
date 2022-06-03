import React, { useState } from "react";
import axios from "axios";

const Join = () => {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  // put을 통해 회원가입 정보 전송
  // response.code 403: 이미 존재하는 아이디
  // 그 외에는 회원가입 성공
  const onClickJoin = () => {
    const validID = () => {
      if (inputId == "") return 0;
      return 1;
    };

    const validPW = () => {
      if (inputPw == "") return 0;
      return 1;
    };

    if (!validID()) {
      console.log("아이디를 입력해주세요.");
      return;
    }

    if (!validPW()) {
      console.log("비밀번호를 입력해주세요.");
      return;
    }

    axios
      .put("http://localhost:5000/api/auth/login", {
        id: inputId,
        password: inputPw,
      })
      .then((res) => {
        if (res.data == 403) {
          console.log("이미 존재하는 아이디입니다.");
        } else {
          document.location.href = "/";
        }
      })
      .catch(console.log(inputId, inputPw));
  };

  const onClickMainPage = () => {
    document.location.href = "/";
  };

  return (
    <div>
      <h2>Join</h2>
      <form>
        <div>
          <label htmlFor="input_id">ID : </label>
          <input
            type="text"
            name="id"
            value={inputId}
            onChange={handleInputId}
          />
        </div>
        <div>
          <label htmlFor="password">PW : </label>
          <input
            type="password"
            name="input_pw"
            value={inputPw}
            onChange={handleInputPw}
          />
        </div>
        <div>
          <button type="button" onClick={onClickJoin}>
            Join
          </button>
        </div>
      </form>
      <button type="button" onClick={onClickMainPage}>
        메인 페이지로 돌아가기
      </button>
    </div>
  );
};
export default Join;
