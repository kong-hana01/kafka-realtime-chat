import React, {useEffect, useState, useRef} from 'react'
import TotalUsers from "../TotalUsers/TotalUsers";
import ChatRoom from "../ChatRoom/ChatRoom";
import './Messenger.css';



const Messenger = () => {
    const [totalUsers, setTotalUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);

    return (
        <>
        <div className = 'messenger'>
            <div className = 'TotalUsers'>
                <div className='TotalUserWrapper'>
                    <TotalUsers totalUsers = {totalUsers} setTotalUsers = {setTotalUsers} setCurrentChat = {setCurrentChat}/> 
                </div>
            </div>
            <div className = 'ChatRoom'>
                <div className='ChatRoomWrapper'>
                    <ChatRoom currentChat = {currentChat} messages = {messages} setMessages = {setMessages}/> 
                </div>
            </div>
        </div>
        </>
    )
}

export default Messenger