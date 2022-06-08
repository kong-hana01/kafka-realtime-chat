import React, {useState} from "react";
import TotalUsers from "../TotalUsers/TotalUsers";
import ChatRoom from "../ChatRoom/ChatRoom";
import "bootstrap/dist/css/bootstrap.css";
import "./Messenger.css";

const Messenger = ({setIsLogin}) => {
  const [totalUsers, setTotalUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState([]);

  const onClickLogout = () => {
    sessionStorage.setItem("user_id", null);
    setIsLogin(false);
  }

  return (
    <>
    <div className="messenger">
      <div className="messengerContents">
        <div className="TotalUsers">
          <div className="TotalUserWrapper">
            <TotalUsers
              totalUsers={totalUsers}
              setTotalUsers={setTotalUsers}
              setCurrentChat={setCurrentChat}
              setMessages={setMessages}
              setRoomId={setRoomId}
              currentChat={currentChat}
            />
          </div>
        </div>
        <div className="ChatRoom">
          <div className="ChatRoomWrapper">
            <ChatRoom
              currentChat={currentChat}
              messages={messages}
              setMessages={setMessages}
              roomId={roomId}
            />
          </div>
        </div>
      </div>
      <button onClick={onClickLogout} className="Logout btn btn-lg btn-primary">
          Logout
        </button>
      </div>
    </>
  );
};

export default Messenger;
