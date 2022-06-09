import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TotalUsers.css";
import "bootstrap/dist/css/bootstrap.css";
import { API_URL } from "../../constants";

function User({ users, setCurrentChat, setMessages, setRoomId, currentChat }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(users.username);
  }, []);

  const changeCurrentChat = () => {
    if (currentChat !== users.id) {
      setCurrentChat(users.id);

      // RoomId 초기화
      setRoomId(user);
      // Message 초기화
      setMessages([]);
    }
  };

  return (
    <div onClick={changeCurrentChat}>
      {currentChat !== users.id ? (
        <div className="userInformation">{user}</div>
      ) : (
        <div className="userInformation" id="currentChat">
          {user}
        </div>
      )}
    </div>
  );
}

export const TotalUsers = ({
  totalUsers,
  setTotalUsers,
  setCurrentChat,
  setMessages,
  setRoomId,
  currentChat,
}) => {
  const [searchUsers, setSearchUsers] = useState("");
  const getUsers = () => {
    try {
      axios.get(`${API_URL}/api/users`).then((res) => {
        if (res.data) {
          sessionStorage.setItem(
            "user_id",
            res.data.filter(
              (u) => u.username === sessionStorage.getItem("user_name")
            )[0].id
          );
          setTotalUsers(
            res.data.filter(
              (u) => u.username !== sessionStorage.getItem("user_name")
            )
          );
        } else {
          alert("채팅가능 목록을 확인하기 위해선 로그인을 하셔야합니다.");
        }
      });
    } catch (err) {
      window.alert(err);
    }
  };

  const handleSearchUsers = (e) => {
    setSearchUsers(e.target.value);
  };

  useEffect(() => {
    try {
      getUsers();
    } catch (err) {
      window.alert(err);
    }
  }, []);

  return (
    <div>
      <div className="searchUsers">
        <input
          placeholder="유저를 검색해주세요."
          className="SearchUserInput"
          value={searchUsers}
          onChange={handleSearchUsers}
        />
        <button onClick={getUsers} className="refresh btn btn-outline-dark">
          새로고침
        </button>
      </div>
      <div className="totalUserList">
        {totalUsers
          .filter((u) => !searchUsers || u.username.includes(searchUsers))
          .map((u) => (
            <User
              users={u}
              key={u.userId}
              setCurrentChat={setCurrentChat}
              setMessages={setMessages}
              setRoomId={setRoomId}
              currentChat={currentChat}
            />
          ))}
      </div>
    </div>
  );
};

export default TotalUsers;
