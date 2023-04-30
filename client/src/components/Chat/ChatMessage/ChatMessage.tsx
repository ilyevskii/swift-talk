import React, {useState} from 'react';
import './ChatMessage.css';
import {useSettingsChanger, useChatMessage} from "../../../hooks";

import {EditOutlined, DeleteOutlined} from "@mui/icons-material";

interface ChatMessageProps {
    message_id: string;
    message: string;
    isMyMessage: boolean;
    time: string;
}

export function ChatMessage(props: ChatMessageProps): JSX.Element {

    const {message_id, message, isMyMessage, time} = props;
    const {text_size} = useSettingsChanger();

    const {deleteWindowMessage, setDeleteWindow} = useChatMessage();
    const {setEditingMessage, setDeletionMessage} = useChatMessage();

    function handleContextMenuClick(event: React.MouseEvent<HTMLDivElement>): void {
        event.preventDefault();
        if (deleteWindowMessage != message_id) {
            setDeleteWindow(message_id);
        }
    }

    function handleEditClick(): void {
        setEditingMessage(message_id);
    }

    function handleDeleteCLick(): void {
        setDeletionMessage(message_id);
    }

    return (
        <>
            {isMyMessage ?
                <div
                    className={`chat-message right`}
                    onContextMenu={handleContextMenuClick}>
                    <p style={{fontSize: `${text_size}px`}}>{message}</p>
                    <span className="message-time">{time}</span>

                    {deleteWindowMessage == message_id &&
                        <div className="delete-menu-down">
                            <ul>
                                <li className='menu-item' onClick={handleEditClick}>
                                    <EditOutlined className='menu-item-icon'/>
                                    <p>Edit</p>
                                </li>
                                <li className='menu-item' style={{color: "#e53935"}} onClick={handleDeleteCLick}>
                                    <DeleteOutlined className='menu-item-icon'/>
                                    <p>Delete</p>
                                </li>
                            </ul>
                        </div>
                    }

                </div>
                :
                <div
                    className={`chat-message left`}
                    onContextMenu={handleContextMenuClick}>
                    <p style={{fontSize: `${text_size}px`}}>{message}</p>
                    <span className="message-time">{time}</span>
                </div>
            }
        </>
    );
}
