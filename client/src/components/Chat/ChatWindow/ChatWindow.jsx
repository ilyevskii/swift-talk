import React, {useEffect} from 'react';
import ChatHeader from '.././ChatHeader/ChatHeader';
import ChatMessage from '.././ChatMessage/ChatMessage';
import {MessageForm} from "../MessageForm/MessageForm";
import {useState} from "react";
import {chatRepo} from "../../../serializer";
import './chatwindow.css';

export default function ChatWindow(props) {

    const [messages, setMessages] = useState([]);
    const {socket, selectedChat, user_id} = props;
    const [chat, setChat] = useState(selectedChat);


    useEffect(() => {
        setMessages([]);

        async function getChatMessages() {

            if (typeof selectedChat === "string") {
                setChat(await chatRepo.getChatInfo(user_id, selectedChat));
            }
            else {
                setChat(selectedChat);
            }
            const messages = await chatRepo.getChatMessages(chat._id);
            setMessages(messages);
        }

        getChatMessages();
    }, [selectedChat])

    async function sendMessage(currentMessage) {

        if (currentMessage) {

            const messageData = {
                chat_id: chat._id,
                sender_id: user_id,
                text: currentMessage,
            }

            setMessages((messages) =>
                [...messages,
                    {
                        _id: Math.floor(Math.random() * 10000000),
                        text: currentMessage,
                        sender_id: user_id,
                        time: new Date(Date.now()).getHours().toString().padStart(2, "0")
                            + ":"
                            + new Date(Date.now()).getMinutes().toString().padStart(2, "0")
                    }])

            await socket.emit("send_message", messageData);
        }
    }

    useEffect(() => {
        socket.on("receive_message", () => {

            async function setLastMessage() {
                const lastMessage = await chatRepo.getLastMessage(chat._id);
                if (lastMessage.sender_id !== user_id) {
                    setMessages((messages) => [...messages, lastMessage]);
                }
            }

            setLastMessage();
        })

    }, [socket]);

    const image_url = 'https://avatars.mds.yandex.net/i?id=5d8db0440aae4c3265492d1b3f8de64dddf64453-8342484-images-thumbs&n=13'
    return (
        <div className="chat-window">
            <ChatHeader chatName={chat.name} chatPhoto={image_url} />
            <div className="chat-messages">
                {messages.map((message) => (
                    <ChatMessage
                        key={message._id}
                        message={message.text}
                        isMyMessage={message.sender_id === user_id}
                        time={message.time}
                    />
                ))}
            </div>
            <MessageForm submitFunc={sendMessage}/>
        </div>
    );
};

