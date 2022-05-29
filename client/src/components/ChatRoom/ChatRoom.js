import React, { useEffect, useState, useRef } from "react";
import "./ChatRoom.css";

function Message({message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <div className="messageText">{message.text}</div>
      </div>
      <div className="messageBottom">1 hour later</div>
    </div>
  );
}

const ChatRoom = ({ currentChat, messages, setMessages }) => {
  const [sendMessages, setSendMessages] = useState([]);
  const [receiveMessages, setReceiveMessages] = useState([]);
  let ws = useRef(null);

  const handleSendMessage = (e) => {
    setSendMessages(e.target.value);
  };

  useEffect(() => {
    if (!ws.current) {
      ws = new WebSocket("ws://localhost:3001?roomId=" + currentChat);
      ws.onopen = (event) => {
        console.log("ws is open");
      };
    }

    ws.onmessage = (event) => {
      console.log("msg arrived: ", event.data);

      const payload = JSON.parse(event.data);
      console.log("payload: ", payload);

      if (payload.type === "receive_msg") {
        let text = "";
        text += `<div>${payload.text}</div>`;

        setMessages(messages.concat(text));
      }
    };
  });

  const sendMsg = () => {
    if (sendMessages != "") {
    const payload = { 
        type: "send_msg", 
        text: sendMessages, 
        sender: sessionStorage.getItem('user_id')
};
    setMessages([...messages, payload]);
    ws.send(JSON.stringify(payload));
    console.log(messages, sendMessages);
    }
  };

  return (
    <div>
      {currentChat ? (
        <>
          <div className="chatRoomTop">
              {messages.map(m => (
                <Message message={m} own = {m.type == 'send_msg'}/>
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
