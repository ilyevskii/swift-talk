import React from 'react';
import './chatmessage.css';

const ChatMessage = ({ message, isMyMessage, time }) => {
    return (
        <div className={`chat-message ${isMyMessage ? 'right' : 'left'}`}>
            <p>{message}</p>
            <span className="message-time">{time}</span>
        </div>
    );
};

export default ChatMessage;
