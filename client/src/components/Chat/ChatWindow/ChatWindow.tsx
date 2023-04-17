import React, {useEffect, useState} from 'react';
import {ChatHeader} from '../ChatHeader/ChatHeader';
import {ChatMessage} from '../ChatMessage/ChatMessage';
import {MessageForm} from '../MessageForm/MessageForm';
import './ChatWindow.css';

import {useChatMessages, useChatInfo} from '../../../hooks/ChatHooks';

interface ChatWindowProps {
    socket: any;
    selectedChat: string;
    user_id: string;
    refresh_chats: () => Promise<any>;
}

export default function ChatWindow(props: ChatWindowProps): JSX.Element {
    const { socket, selectedChat, user_id, refresh_chats } = props;

    const [chat, setChat] = useState<string>(selectedChat);

    const {
        isMessagesLoading,
        isMessagesError,
        chat_messages,
        messages_error,
        refresh_messages,
    } = useChatMessages(chat);

    const {
        isChatInfoLoading,
        isChatInfoError,
        chat_info,
        chat_info_error,
        refresh_chat_info,
    } = useChatInfo(user_id, chat);

    useEffect((): void => {
        setChat(selectedChat);
    }, [selectedChat]);

    async function sendMessage(currentMessage: string): Promise<void> {
        if (currentMessage) {
            const messageData = {
                chat_id: chat,
                sender_id: user_id,
                text: currentMessage,
            };

            await socket.emit('send_message', messageData);
        }
    }

    useEffect(() => {
        socket.on('receive_message', async () => {
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
                                {chat_messages.map((message) => (
                                    <ChatMessage
                                        key={message._id}
                                        message={message.text}
                                        isMyMessage={message.sender_id === user_id}
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
