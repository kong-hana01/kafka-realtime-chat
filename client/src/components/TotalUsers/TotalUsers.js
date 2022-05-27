import React, {useEffect, useState} from 'react'
import axios from "axios";


function User(){

}


export const TotalUsers = () => {
    const [totalUsers, setTotalUsers] = useState([{
        id: sessionStorage.getItem('user_id'),
        online: true
    }]);

    const getUsers = () => {
        axios
        .get("http://localhost:5000/api/auth/" + sessionStorage.getItem('user_id'))
        .then((res) => {
          if (res.data){
            console.log(res.data);
          }
          else{
            console.log("채팅가능 목록을 확인하기 위해선 로그인을 하셔야합니다.");
          }
        })
        .catch(console.log(sessionStorage.getItem('user_id')));
      };


    return (
        <div>
            <button onClick={getUsers}>새로고침</button>
            {/* {totalUsers} */}
        </div>
    )
}

export default TotalUsers