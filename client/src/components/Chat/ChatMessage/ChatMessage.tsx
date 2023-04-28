import React from 'react';
import './ChatMessage.css';
import {useSettingsChanger} from "../../../hooks";

interface ChatMessageProps {
    message: string;
    isMyMessage: boolean;
    time: string;
}

export function ChatMessage(props: ChatMessageProps): JSX.Element {

    const { message, isMyMessage, time } = props;
    const {text_size} = useSettingsChanger();

    return (
        <div className={`chat-message ${isMyMessage ? 'right' : 'left'}`}>
            <p style={{fontSize: `${text_size}px`}}>{message}</p>
            <span className="message-time">{time}</span>
        </div>
    );
};
