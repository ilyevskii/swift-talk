import './ChatWindow.css';

import React, {useEffect} from 'react';
import {ChatHeader, ChatMessage, MessageForm} from 'components';
import {socket} from "App";

import {useChatMessages, useChatInfo, useChatList, useUserChats,useChatMessage} from 'hooks';
import {useAuth} from "../../../contexts/Auth/AuthContext";
import {MessageDTO} from "../../../repositories";


export function ChatWindow(): JSX.Element {

    const {user} = useAuth();
    const {selectedChat} = useChatList();
    const {refresh_chats} = useUserChats(user!._id)
    const {editingMessage, setEditingMessage} = useChatMessage();

    const {
        isMessagesLoading,
        isMessagesError,
        chat_messages,
        messages_error,
        refresh_messages,
    } = useChatMessages(selectedChat!);

    const {
        isChatInfoLoading,
        isChatInfoError,
        chat_info,
        chat_info_error,
        refresh_chat_info,
    } = useChatInfo(user!._id, selectedChat!);


    async function sendMessage(currentMessage: string): Promise<void> {

        if (currentMessage) {

            if (editingMessage) {

                const messageData = {
                    chat_id: selectedChat!,
                    message_id: editingMessage.id,
                    text: currentMessage
                }
                await socket.emit("edit_message", messageData);
                setEditingMessage(null);
            }
            else {

                const messageData = {
                    chat_id: selectedChat!,
                    sender_id: user!._id,
                    text: currentMessage,
                };
                await socket.emit('send_message', messageData);
            }

        }
    }

    useEffect(() => {

        socket.on('messages_changed', async (): Promise<void> => {
            await refresh_messages();
            await refresh_chats();
        });

    }, [socket]);

    const image_url: string =
        'https://avatars.mds.yandex.net/i?id=5d8db0440aae4c3265492d1b3f8de64dddf64453-8342484-images-thumbs&n=13';

    return (
        <div className="chat-window">
            {!isChatInfoLoading ? (
                <>
                    <ChatHeader chatName={chat_info.name} chatPhoto={image_url} />
                    <div className="chat-messages">
                        {!isMessagesLoading ? (
                            <>
                                {chat_messages.map((message: MessageDTO) => (
                                    <ChatMessage
                                        key={message._id}
                                        message_id={message._id}
                                        message={message.text}
                                        is_edited={message.is_edited}
                                        isMyMessage={message.sender_id === user!._id}
                                        time={message.time}
                                    />
                                ))}
                            </>
                        ) : (
                            <div style={{ color: 'white' }}>Loading...</div>
                        )}
                    </div>
                    <MessageForm submitFunc={sendMessage} />
                </>
            ) : (
                <div style={{ color: 'white' }}>Loading...</div>
            )}
        </div>
    );
}
