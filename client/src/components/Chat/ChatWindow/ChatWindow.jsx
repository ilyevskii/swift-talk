import React from 'react';
import ChatHeader from '.././ChatHeader/ChatHeader';
import ChatMessage from '.././ChatMessage/ChatMessage';
import './chatwindow.css';

const messages = [
    {
        id: 1,
        text: 'JdjfhghkskfjgfjgJdjfhghkskfjgfjgJdjfhghkskfjgfjgJdjfhghkskfjgfjgJdjfhghkskfjgfjgJdjfhghkskfjgfjgJdjfhghkskfjgfjgJdjfhghkskfjgfjgJdjfhghkskfjgfjgJdjfhghkskfjgfjg',
        sender_id: 1
    },
    {
        id: 2,
        text: 'Hi',
        sender_id: 2
    },
    {
        id: 3,
        text: 'Jdjfhghkskfjgfjg',
        sender_id: 1
    },
    {
        id: 4,
        text: 'Hi',
        sender_id: 1
    }
]

export default function ChatWindow({ chat, user_id }) {
    const image_url = 'https://avatars.mds.yandex.net/i?id=5d8db0440aae4c3265492d1b3f8de64dddf64453-8342484-images-thumbs&n=13'
    return (
        <div className="chat-window">
            <ChatHeader chatName={'Test'} chatPhoto={image_url} />
            <div className="chat-messages">
                {messages.map((message) => (
                    <ChatMessage
                        key={message.id}
                        message={message.text}
                        isMyMessage={message.sender_id === 1}
                        time={'11:11'}
                    />
                ))}
            </div>
        </div>
    );
};

