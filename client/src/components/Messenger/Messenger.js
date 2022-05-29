import React, {useEffect, useState} from 'react'
import TotalUsers from "../TotalUsers/TotalUsers";
import ChatRoom from "../ChatRoom/ChatRoom";
import './Messenger.css';

const Messenger = () => {


    return (
        <>
        <div className = 'messenger'>
            <div className = 'TotalUsers'>
                <div className='TotalUserWrapper'>
                    <TotalUsers /> 
                </div>
            </div>
            <div className = 'ChatRoom'>
                <div className='ChatRoomWrapper'>
                    <ChatRoom /> 
                </div>
            </div>
        </div>
        </>
    )
}

export default Messenger