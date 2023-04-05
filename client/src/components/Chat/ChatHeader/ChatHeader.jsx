import React from 'react';
import './chatheader.css';

export default function ChatHeader ({ chatName, chatPhoto }) {
    return (
        <div className="chat-header">
            <div className="chat-photo">
                <img src={chatPhoto} alt="Chattt Photo" />
            </div>
            <div className="chat-info">
                <h2>{chatName}</h2>
            </div>
            <div className="chat-search">
                <i className="fa fa-search"></i>
            </div>
        </div>
    );
};

