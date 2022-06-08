import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TotalUsers.css";
import "bootstrap/dist/css/bootstrap.css";
import { API_URL } from "../../constants";

function User({ users, setCurrentChat, setMessages, setRoomId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // const otherUserId = users.userId;
    setUser(users.username);
  }, []);

  const changeCurrentChat = () => {
    setCurrentChat(user);

    // RoomId 초기화
    setRoomId(user);
    // Message 초기화
    setMessages([]);
  };

  return (
    <div onClick={changeCurrentChat}>
      <div className="userInformation">{user}</div>
    </div>
  );
}


export const TotalUsers = ({
  totalUsers,
  setTotalUsers,
  setCurrentChat,
  setMessages,
  setRoomId,
}) => {
  const [searchUsers, setSearchUsers] = useState('');
  const getUsers = () => {
    try {
      axios
        .get(`${API_URL}/api/users`)
        .then((res) => {
          if (res.data) {
            console.log(res.data.filter((u) => u.username !== sessionStorage.getItem('user_id')));
            setTotalUsers(res.data.filter((u) => u.username !== sessionStorage.getItem('user_id')));
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

  const handleSearchUsers = (e) => {
    setSearchUsers(e.target.value);
  }


  useEffect(() => {
    try {
      getUsers();
      console.log(totalUsers);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <div className="searchUsers">
        <input placeholder="Search for Users" 
              className="SearchUserInput" 
              value={searchUsers}
              onChange={handleSearchUsers}/>
        <button onClick={getUsers} className="refresh btn btn-secondary">
          새로고침
        </button>
      </div>
      {totalUsers.filter((u) => !searchUsers || (u.username).includes(searchUsers)).map((u) => (
        <User
          users={u}
          key={u.username}
          setCurrentChat={setCurrentChat}
          setMessages={setMessages}
          setRoomId={setRoomId}
        />
      ))}
    </div>
  );
};

export default TotalUsers;
