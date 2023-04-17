import React from 'react';
import './HorizontalChatList.css';
import {ChatDTO} from "messanger-serializer";
interface Props {
    socket: any;
    chats: ChatDTO[];
    setSelectedChat: (id: string) => void;
}

export default function HorizontalChatList(props: Props): JSX.Element {

    const { socket, chats, setSelectedChat } = props;
    const image_url: string = 'https://avatars.mds.yandex.net/i?id=5d8db0440aae4c3265492d1b3f8de64dddf64453-8342484-images-thumbs&n=13';
    
    return (
        <div className="horizontal-chat-list">
            {chats.length ? (
                <div className="horizontal-chat-list-content">
                    {chats.map((chat) => (
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
