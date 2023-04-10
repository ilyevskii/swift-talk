import './verticalchatlist.css';

export default function VerticalChatList(props) {

    const {socket, chats, setSelectedChat} = props;

    const image_url = 'https://avatars.mds.yandex.net/i?id=5d8db0440aae4c3265492d1b3f8de64dddf64453-8342484-images-thumbs&n=13'
    return (
        <>
            <div className="vertical-chat-list">
                {chats.length ?
                    <div className="vertical-chat-list-content">
                    {chats.map((chat) => (
                        <div key={chat._id} className="vertical-chat-preview">
                            <img src={image_url} alt={chat.name} className="vertical-chat-image" />

                            <div className="vertical-chat-info" onClick={() =>
                            {
                                socket.emit("join_chat", chat._id)
                                setSelectedChat(chat)
                            }}>
                                <h3 className="vertical-chat-name">{chat.name}</h3>
                                {Object.keys(chat.last_message).length ?
                                    <>
                                        <p className="vertical-chat-last-message">
                                            {chat.last_message.text}
                                            <span>{chat.last_message.time}</span>
                                        </p>
                                    </>
                                    :
                                    <p className="vertical-chat-last-message">No messages yet.</p>
                                }

                            </div>
                        </div>
                    ))}
                    </div>

                    :
                    <div className="no-user-chats">
                        <p>No chats yet.</p>
                    </div>
                }
            </div>
        </>
    );
}

