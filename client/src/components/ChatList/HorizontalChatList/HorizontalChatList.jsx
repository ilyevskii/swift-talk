import './horizontalchatlist.css';
import { useEffect, useState } from "react";

interface Chat {
    id: number;
    name: string;
}

interface Props {
    chats: Chat[];
}

export default function HorizontalChatList({ chats }: Props) {
    useEffect(() => {
        console.log(chats);
    }, [])

    const image_url = 'https://avatars.mds.yandex.net/i?id=5d8db0440aae4c3265492d1b3f8de64dddf64453-8342484-images-thumbs&n=13'

    return (
        <>
            <div className="horizontal-chat-list">
                {chats.length ?
                    <div className="horizontal-chat-list-content">
                        {chats.map((chat: Chat) => (
                            <div key={chat.id} className="horizontal-chat-preview">
                                <img src={image_url} alt={chat.name} className="horizontal-chat-image" />
                                <h3 className="horizontal-chat-name">{chat.name}</h3>
                            </div>
                        ))}
                    </div>

                    :
                    <></>
                }
            </div>
        </>
    );
}
