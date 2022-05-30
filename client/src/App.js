import React, {useEffect, useState} from "react";
import Messenger from "./components/Messenger/Messenger";
import Login from "./components/Login/Login";


function App () {
  const [isLogin, setIsLogin] = useState(false);
  
  useEffect(() => {
    if(sessionStorage.getItem('user_id') === null){
      console.log('isLogin ?? :: ', isLogin)
    } else {
      setIsLogin(true)
      console.log('isLogin ?? :: ', isLogin)
    }
  }, [])
  return (
    <div>
      {isLogin ? <Messenger /> : <Login />}
    </div>
  )

}



export default App;
