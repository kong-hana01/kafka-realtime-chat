import React, {useEffect, useState} from "react";
import Messenger from "./components/Messenger/Messenger";
import LoginPage from "./components/LoginPage/LoginPage";
import "./App.css";

function App () {
  const [isLogin, setIsLogin] = useState(false);
  
  useEffect(() => {
    if(sessionStorage.getItem('user_name') === null || sessionStorage.getItem('user_name') === 'null'){
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [])
  return (
    <div className = "App">
      {isLogin ? <Messenger setIsLogin = {setIsLogin}/> : <LoginPage />}
    </div>
  )

}



export default App;
