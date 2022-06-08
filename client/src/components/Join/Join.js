import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants";
import "bootstrap/dist/css/bootstrap.css";
import "./Join.css";

const Join = ({ setIsJoin }) => {
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
      if (inputId === "") return 0;
      return 1;
    };

    const validPW = () => {
      if (inputPw === "") return 0;
      return 1;
    };

    if (!validID()) {
      alert("아이디를 입력해주세요!");
      return;
    }

    if (!validPW()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    axios
      .put(`${API_URL}/api/auth/login`, {
        id: inputId,
        password: inputPw,
      })
      .then((res) => {
        if (!res.data) {
          alert("이미 존재하는 아이디입니다.");
        } else {
          document.location.href = "/";
        }
      });
  };
  const onKeyJoin = (e) => {
    if (e.key == "Enter") onClickJoin();
  };

  const onClickMainPage = () => {
    setIsJoin(false);
  };

  return (
    <div className="main">
      <div className="form-join">
        <h1 className="mb-3 fw-bold">Franz DM</h1>
        <div className="h4 mb-3 fw-bold"> 가입하기 </div>
        <form>
          <div className="form-floating input-container">
            <label htmlFor="input_id" className={inputId && "filled"}>
              Enter ID{" "}
            </label>
            <input
              type="id"
              name="input_id"
              value={inputId}
              onChange={handleInputId}
              className="form-control"
              onKeyPress={onKeyJoin}
            />
          </div>
          <div className="form-floating input-container">
            <label htmlFor="password" className={inputPw && "filled"}>
              Enter password{" "}
            </label>
            <input
              type="password"
              name="input_pw"
              value={inputPw}
              onChange={handleInputPw}
              className="form-control"
              onKeyPress={onKeyJoin}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={onClickJoin}
              className="w-100 btn btn-lg btn-primary"
            >
              Join
            </button>
          </div>
        </form>
      </div>

      <div className="login">
        <div>계정이 있으신가요?</div>
        <button
          type="button"
          onClick={onClickMainPage}
          className="btn btn-link"
        >
          로그인
        </button>
      </div>
    </div>
  );
};
export default Join;
