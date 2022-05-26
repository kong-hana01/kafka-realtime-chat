import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./components/chat/chat";
import Login from "./components/login/login";



// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       id: null,
//       auth: false,
//     };
//   }

//   const [id, setId] = useState();

//   render() {
//     return (
//       <Router>
//         <Routes>
//           {this.state.id ? (
//             <Route path="/" element={<Chat user={this} />} />
//           ) : (
//             <Route exact path="/" element={<Login user={this} />} />
//           )}
//         </Routes>
//       </Router>
//     );
//   }
// }


function App () {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if(sessionStorage.getItem('user_id') === null){
    // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
      console.log('isLogin ?? :: ', isLogin)
    } else {
    // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
    // 로그인 상태 변경
      setIsLogin(true)
      console.log('isLogin ?? :: ', isLogin)
    }
  })
  return (
    <div>
      {isLogin ? 
      	// Main 컴포넌트 호출 시 isLogin 이라는 props 값을 전달
        <Chat isLogin={isLogin} /> : 
        <Login />}
    </div>
  )

}



export default App;
