import React from 'react';
import './HorizontalChatList.css';

import {useChatList, useSocket, useUserChats} from "hooks";
import {useAuth} from "../../../contexts/Auth/AuthContext";


export function HorizontalChatList(): JSX.Element {

    const {user} = useAuth();
    const {socket} = useSocket();
    const {user_chats} = useUserChats(user!._id);
    const {setSelectedChat} = useChatList();

    const image_url: string = 'https://avatars.mds.yandex.net/i?id=5d8db0440aae4c3265492d1b3f8de64dddf64453-8342484-images-thumbs&n=13';
    
    return (
        <div className="horizontal-chat-list">
            {user_chats!.length ? (
                <div className="horizontal-chat-list-content">
                    {user_chats!.map((chat) => (
                        <div
                            key={chat._id}
                            className="horizontal-chat-preview"
                            onClick={() => {
                                socket.emit('join_chat', chat._id);
                                setSelectedChat(chat._id);
                            }}
                        >
                            <img
                                src={image_url}
                                alt={chat.name}
                                className="horizontal-chat-image"
                            />
                            <h3 className="horizontal-chat-name">{chat.name}</h3>
                        </div>
                    ))}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
