import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TotalUsers.css";

function User(users) {
  const [user, setUser] = useState(null);

  useEffect(() =>{
    const otherUserId = users.users.userId;
    setUser(otherUserId);
  }, []);

  return (
    <div>
      <div className="userInformation">{user}</div>
    </div>
  );
}

export const TotalUsers = () => {
  const [totalUsers, setTotalUsers] = useState([]);

  const getUsers = () => {
    try {
      axios
        .get(
          "http://localhost:5000/api/auth/" + sessionStorage.getItem("user_id")
        )
        .then((res) => {
          if (res.data) {
            setTotalUsers(res.data);
          } else {
            console.log(
              "채팅가능 목록을 확인하기 위해선 로그인을 하셔야합니다."
            );
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      getUsers();
      console.log(1);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <div className="searchUsers">
        <input placeholder="Search for Users" className="SearchUserInput" />
        <button onClick={getUsers} className="refresh">
          새로고침
        </button>
      </div>
      {totalUsers.map((u) => (
        <User users={u}/>
      ))}

    </div>
  );
};

export default TotalUsers;
