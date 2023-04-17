import React from 'react';
import './ChatMessage.css';

interface ChatMessageProps {
    message: string;
    isMyMessage: boolean;
    time: string;
}

export function ChatMessage(props: ChatMessageProps): JSX.Element {

    const { message, isMyMessage, time } = props;

    return (
        <div className={`chat-message ${isMyMessage ? 'right' : 'left'}`}>
            <p>{message}</p>
            <span className="message-time">{time}</span>
        </div>
    );
};
