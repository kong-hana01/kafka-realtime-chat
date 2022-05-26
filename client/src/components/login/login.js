import React, { useState, useEffect } from "react";
import axios from "axios";
import { loginCall } from "../../apiCalls";

const Login = () => {
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
        res.data ? sessionStorage.setItem('user_id', inputId) : console.log("로그인 정보가 일치하지 않습니다.");
        document.location.href = "/";
      })
      .catch(console.log(inputId, inputPw));
  };

  // // 페이지 렌더링 후 가장 처음 호출되는 함수
  //   useEffect(() => {
  //       axios.get('http://localhost:5000/login')
  //       .then(res => console.log(res))
  //       .catch()
  //   },
  //   // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
  //   [])

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
    </div>
  );
};
export default Login;
