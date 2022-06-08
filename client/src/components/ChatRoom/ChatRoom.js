import React, { useEffect, useState, useRef, useCallback } from "react";
import { CHAT_API_URL } from "../../constants";
import Loading from "../Loading/Loading";

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
  const [loading, setLoading] = useState(true);
  let ws = useRef(null);
  const scrollRef = useRef();

  const handleSendMessage = (e) => {
    setSendMessages(e.target.value);
  };

  const mainApi = () => {
    try {
      const onMessage = (currentChat) => {
        ws.current.onmessage = (event) => {
          const payload = JSON.parse(event.data);
          console.log("payload: ", payload);
          console.log("msg arrived: ", event.data);

          if (
            payload.senderId == sessionStorage.getItem("user_id") ||
            (payload.receiverId == sessionStorage.getItem("user_id") &&
              payload.senderId == currentChat)
          ) {
            if (payload.type === "receive_msg") {
              setMessages((messages) => [...messages, payload]);
            }
          }
        };
      };
      const result = onMessage(currentChat);
    } catch (e) {
      window.alert(e);
    }
  };

  useEffect(() => {
    if (!currentChat) {
      return;
    }
    setLoading(true);
    const url = new URL(CHAT_API_URL);
    url.searchParams.append("senderId", sessionStorage.getItem("user_id"));
    url.searchParams.append("receiverId", currentChat);

    ws.current = new WebSocket(url.href);
    ws.current.onopen = (event) => {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      console.log("ws is open", ws.current);
    };

    return () => {
      console.log("clean up");
      ws.current.close();
    };
  }, [currentChat]);

  useEffect(() => {
    if (!currentChat) {
      return;
    }
    mainApi();
  });

  const sendMsg = () => {
    if (sendMessages !== "") {
      var now = new Date();
      const payload = {
        type: "send_msg",
        text: sendMessages,
        senderId: sessionStorage.getItem("user_id"),
        receiverId: currentChat,
        timestamp: now.getHours() + ":" + now.getMinutes(),
      };
      ws.current.send(JSON.stringify(payload));
      setSendMessages("");
    }
  };

  const onKeySendMsg = (e) => {
    if (e.key === "Enter") sendMsg();
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      {currentChat ? (
        <>
          <div className="chatRoomTop">
             {loading ? <Loading /> : null}
            {messages
              .sort((m1, m2) => m1.timestamp < m2.timestamp)
              .map((m) => (
                <div ref={scrollRef}>
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
              className="MessageInput form-control"
              rows="2"
              placeholder="내용을 입력해주세요."
              value={sendMessages}
              onChange={handleSendMessage}
              onKeyPress={onKeySendMsg}
            />
            <button
              id="buttonSend"
              className="btn btn-lg btn-primary"
              onClick={sendMsg}
            >
              보내기
            </button>
          </div>
        </>
      ) : (
        <span className="noConversationText"> 채팅방을 열어주세요.</span>
      )}
    </div>
  );
};

export default ChatRoom;
