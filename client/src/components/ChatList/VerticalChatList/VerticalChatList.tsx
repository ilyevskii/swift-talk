import './VerticalChatList.css';
import {socket} from "App";
import React, {useState} from 'react';

import {useAuth} from "../../../contexts/Auth/AuthContext";
import {useChatList, useUserChats, useMenu} from "hooks";
import {Create, PersonOutlined, GroupOutlined} from "@mui/icons-material";


export function VerticalChatList(): JSX.Element {

    const {user} = useAuth();
    const {user_chats} = useUserChats(user!._id);
    const {setSelectedChat} = useChatList();
    const {setMenuItem, setMenuItemActive} = useMenu();

    const [isClicked, setIsClicked] = useState(false);

    const image_url: string = 'https://avatars.mds.yandex.net/i?id=5d8db0440aae4c3265492d1b3f8de64dddf64453-8342484-images-thumbs&n=13';

    const handleMessageClick = (): void => {
        setMenuItem('contacts');
        setMenuItemActive(true);
    }

    const handleGroupChatClick = (): void => {
        setMenuItem('new_group');
        setMenuItemActive(true);
    }

    return (
        <>
            <div className="left-container">
                {user_chats!.length ? (
                    <>
                        <div className="vertical-chat-list-content">
                            {user_chats!.map((chat) => (
                                <div key={chat._id} className="vertical-chat-preview">
                                    <img
                                        src={image_url}
                                        alt={chat.name}
                                        className="vertical-chat-image"
                                    />

                                    <div
                                        className="vertical-chat-info"
                                        onClick={() => {
                                            socket.emit('join_chat', chat._id);
                                            setSelectedChat(chat._id);
                                        }}
                                    >
                                        <h3 className="vertical-chat-name">{chat.name}</h3>
                                        {Object.keys(chat.last_message).length ? (
                                            <>
                                                <p className="vertical-chat-last-message">
                                                    {chat.last_message.text}
                                                    <span>{chat.last_message.time}</span>
                                                </p>
                                            </>
                                        ) : (
                                            <p className="vertical-chat-last-message">
                                                No messages yet.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {isClicked &&
                            <div className="new-chat-menu">
                                <ul>
                                    <li className='menu-item' onClick={handleGroupChatClick}>
                                        <GroupOutlined className='menu-item-icon'/>
                                        <p>New group</p>
                                    </li>
                                    <li className='menu-item' onClick={handleMessageClick}>
                                        <PersonOutlined className='menu-item-icon'/>
                                        <p>New message</p>
                                    </li>
                                </ul>
                            </div>
                        }
                        <button className={"add-chat-btn"} onClick={() => setIsClicked(state => !state)}><Create /></button>
                    </>
                ) : (
                    <>
                        <div className="no-user-chats">
                            <p>No chats yet.</p>
                        </div>
                        <button className={"add-chat-btn"} onClick={() => setIsClicked(state => !state)}><Create /></button>
                    </>

                )}
            </div>
        </>
    );
}
