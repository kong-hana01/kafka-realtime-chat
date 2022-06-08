import React, { useState } from "react";
import Join from "../Join/Join";
import Login from "../Login/Login";

const LoginPage = () => {
  const [isJoin, setIsJoin] = useState(false);

  return (
      <div>
        {isJoin ? <Join setIsJoin = {setIsJoin}/> : <Login setIsJoin = {setIsJoin}/> }
      </div>
  );
};
export default LoginPage;
