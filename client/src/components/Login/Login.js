import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants";
import "bootstrap/dist/css/bootstrap.css";
import "./Login.css";

const Login = ({ setIsJoin }) => {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  // login 버튼 클릭 이벤트
  const onClickLogin = () => {
    axios
      .post(`${API_URL}/api/auth/login`, {
        id: inputId,
        password: inputPw,
      })
      .then((res) => {
        if (res.data) {
          sessionStorage.setItem("user_name", inputId);
          document.location.href = "/";
        } else {
          alert("아이디 또는 패스워드를 확인해주세요.");
        }
      })
  };

  const onClickJoin = () => {
    setIsJoin(true);
  };

  const onKeyLogin = (e) => {
    if (e.key == "Enter") onClickLogin();
  }

  return (
    <div className="main">
      <div className="form-login">
        <h1 className="mb-3 fw-bold">Franz DM</h1>
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
              onKeyPress={onKeyLogin}
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
              onKeyPress={onKeyLogin}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={onClickLogin}
              className="w-100 btn btn-lg btn-primary"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="join">
        <div>계정이 없으신가요?</div>
        <button type="button" onClick={onClickJoin} className="btn btn-link">
          가입하기
        </button>
      </div>
    </div>
  );
};
export default Login;
