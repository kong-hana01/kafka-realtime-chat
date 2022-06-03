import React, { useState } from "react";
import axios from "axios";
import Join from "../Join/Join";

const Login = ({setIsJoin}) => {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  // login 버튼 클릭 이벤트
  const onClickLogin = () => {
    axios
      .post("http://localhost:5000/api/auth/login", {
        id: inputId,
        password: inputPw,
      })
      .then((res) => {
        if (res.data) {
          sessionStorage.setItem("user_id", inputId);
          document.location.href = "/";
        } else {
          console.log("로그인 정보가 일치하지 않습니다.");
        }
      })
      .catch(console.log(inputId, inputPw));
  };

  const onClickJoin = () => {
    setIsJoin(true);
  };
  return (
    <div>
      <h2>Login</h2>
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
          <button type="button" onClick={onClickLogin}>
            Login
          </button>
        </div>
      </form>
      <button type="button" onClick={onClickJoin}>
          Join
        </button> 
    </div>
  );
};
export default Login;
