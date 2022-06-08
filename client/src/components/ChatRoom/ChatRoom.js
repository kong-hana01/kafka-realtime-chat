import React, { useEffect, useState, useRef, useCallback } from "react";
import { CHAT_API_URL } from "../../constants";
import "bootstrap/dist/css/bootstrap.css";
import "./ChatRoom.css";

function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <div className="messageText">{message.text}</div>
      </div>
      <div className="messageBottom">{message.timestamp}</div>
    </div>
  );
}

const ChatRoom = ({ currentChat, messages, setMessages, roomId }) => {
  const [sendMessages, setSendMessages] = useState([]);
  let ws = useRef(null);
  const scrollRef = useRef();

  const handleSendMessage = (e) => {
    setSendMessages(e.target.value);
  };

  useEffect(() => {
    if (!currentChat) {
      return;
    }

    const url = new URL(CHAT_API_URL);
    url.searchParams.append("senderId", sessionStorage.getItem("user_id"));
    url.searchParams.append("receiverId", currentChat);

    ws.current = new WebSocket(url.href);
    ws.current.onopen = (event) => {
      console.log("ws is open", ws.current);
    };
  }, [currentChat]);

  useEffect(() => {
    if (!currentChat) {
      return;
    }

    ws.current.onmessage = (event) => {
      console.log("msg arrived: ", event.data);

      const payload = JSON.parse(event.data);
      console.log("payload: ", payload);

      if (payload.type === "receive_msg") {
        setMessages((messages) => [...messages, payload]);
      }
    };
  });

  const sendMsg = () => {
    if (sendMessages !== "") {
      const payload = {
        type: "send_msg",
        text: sendMessages,
        senderId: sessionStorage.getItem("user_id"),
        receiverId: currentChat,
        timestamp: Date(),
      };
      console.log(ws.current);
      ws.current.send(JSON.stringify(payload));
    }
  };

  useEffect(() => {
    if(scrollRef.current){
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      {currentChat ? (
        <>
          <div className="chatRoomTop">
            {messages
              .sort((m1, m2) => m1.timestamp < m2.timestamp)
              .map((m) => (
                <div ref = {scrollRef}>
                <Message
                  message={m}
                  own={m.senderId === sessionStorage.getItem("user_id")}
                />
                </div>
              ))}
          </div>
          <div className="chatRoomBottom">
            <input
              type="text"
              className="MessageInput"
              placeholder="Write something ..."
              value={sendMessages}
              onChange={handleSendMessage}
            />
            <button id="buttonSend" className = "btn btn-lg btn-primary" onClick={sendMsg}>
              Send
            </button>
          </div>
        </>
      ) : (
        <span className="noConversationText">
          {" "}
          Open a conversation to start a chat
        </span>
      )}
    </div>
  );
};

export default ChatRoom;
