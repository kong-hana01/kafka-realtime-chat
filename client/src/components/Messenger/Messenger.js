import React, {useEffect, useState} from 'react'
import TotalUsers from "../TotalUsers/TotalUsers";
import ChatRoom from "../ChatRoom/ChatRoom";

const Messenger = () => {


    return (
        <div>
            <div>
                <div className = 'TotalUsers'><TotalUsers /> </div>
            </div>
            <div>
                <div className = 'ChatRoom'><ChatRoom /> </div>
            </div>
        </div>
    )
}

export default Messenger