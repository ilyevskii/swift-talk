import './verticalchatlist.css';
import {useAuth} from "../../../contexts/Auth/AuthContext";

export default function VerticalChatList() {

    const {user} = useAuth();

    const chats = [
        {
            id: 1,
            name: 'мэри.',
            lastMessage: 'Привет! Как дела?'
        },
        {
            id: 2,
            name: 'илья.',
            lastMessage: 'Ооооо'
        },
        {
            id: 3,
            name: 'катя.',
            lastMessage: 'аплллfjfjfjfjfjfjfjfjkdjkfnjgngkjkgjksbgnjfbhdjkbgfnjgfnjdfтпдпаодлпалд'
        }
        ,
        {
            id: 4,
            name: 'катя.',
            lastMessage: 'аплллтпдпаодлпалд'
        }
        ,
        {
            id: 5,
            name: 'катя.',
            lastMessage: 'аплллтпдпаодлпалд'
        }
        ,
        {
            id: 6,
            name: 'катя.',
            lastMessage: 'аплллтпдпаодлпалд'
        }
        ,
        {
            id: 7,
            name: 'катя.',
            lastMessage: 'аплллтпдпаодлпалд'
        }
        ,
        {
            id: 8,
            name: 'катя.',
            lastMessage: 'аплллтпдпаодлпалд'
        }
        ,
        {
            id: 9,
            name: 'катя.',
            lastMessage: 'аплллтпдпаодлпалд'
        }
        ,
        {
            id: 10,
            name: 'катя.',
            lastMessage: 'аплллтпдпаодлпалд'
        }
        ,
        {
            id: 11,
            name: 'катя.',
            lastMessage: 'аплллтпдпаодлпалд'
        },
        {
            id: 12,
            name: 'катя.',
            lastMessage: 'аплллтпдпаодлпалд'
        }
        ,
        {
            id: 13,
            name: 'катя.',
            lastMessage: 'аплллтпдпаодлпалд'
        }
        ,
        {
            id: 113,
            name: 'катя.',
            lastMessage: 'аплллтпдпаодлпалд'
        }
        ,
        {
            id: 3345,
            name: 'катя.',
            lastMessage: 'аплллтпдпаодлпалд'
        }
        ,
        {
            id: 33645,
            name: 'катя.',
            lastMessage: 'аплллтпдпаодлпалд'
        }
    ]

    const image_url = 'https://avatars.mds.yandex.net/i?id=5d8db0440aae4c3265492d1b3f8de64dddf64453-8342484-images-thumbs&n=13'
    return (
        <>
            <div className="vertical-chat-list">
                {chats ?
                    <div className="vertical-chat-list-content">
                    {chats.map((chat) => (
                        <div key={chat.id} className="vertical-chat-preview">
                            <img src={image_url} alt={chat.name} className="vertical-chat-image" />
                            <div className="chat-info">
                                <h3 className="vertical-chat-name">{chat.name}</h3>
                                <p className="vertical-chat-last-message">{chat.lastMessage}</p>
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

