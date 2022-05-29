import React, {useEffect, useState} from 'react'
import './ChatRoom.css';

function Message({own}) {
    return (
            <div className = {own? "message own" : 'message'}>
                <div className = "messageTop">
                    <div className = "messageText">Hello this is a message</div>
                </div>
                <div className = "messageBottom">1 hour later</div>
            </div>

        )
}


const ChatRoom = () => {
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);

    return (
        
        <div>
            {currentChat ?
            <>
            <div className = 'chatRoomTop'>
                <Message />
                <Message own={true}/>
                <Message />
            </div>
            <div className = 'chatRoomBottom'>
                <textarea placeholder='Write somthing ...' className = 'MessageInput'></textarea>        
                <button id="buttonSend">Send</button>
            </div>  
            </> : <span className='noConversationText'> Open a conversation to start a chat</span>}
        </div>
        
    )
}

export default ChatRoom