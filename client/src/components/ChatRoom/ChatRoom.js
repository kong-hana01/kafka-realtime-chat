import React, { useEffect, useState, useRef } from "react";
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

  const handleSendMessage = (e) => {
    setSendMessages(e.target.value);
  };

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:3001?roomId=" + roomId);
    ws.current.onopen = (event) => {
      console.log("ws is open", ws.current);

      // Message History 복구
      // setMessages([])
    };
  }, [currentChat]);

  useEffect(() => {
    ws.current.onmessage = (event) => {
      console.log("msg arrived: ", event.data);

      const payload = JSON.parse(event.data);
      console.log("payload: ", payload);

      if (payload.type === "receive_msg") {
        setMessages([...messages, payload]);
      }
    };
  });

  const sendMsg = () => {
    if (sendMessages != "") {
      const payload = {
        type: "send_msg",
        text: sendMessages,
        sender: sessionStorage.getItem("user_id"),
        receiver: currentChat,
        timestamp: Date(),
      };
      console.log(ws.current);
      ws.current.send(JSON.stringify(payload));
      setMessages([...messages, payload]);
    }
  };

  return (
    <div>
      {currentChat ? (
        <>
          <div className="chatRoomTop">
            {messages.map((m) => (
              <Message message={m} own={m.type == "send_msg"} />
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
            <button id="buttonSend" onClick={sendMsg}>
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
