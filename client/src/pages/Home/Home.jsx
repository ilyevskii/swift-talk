import {useState} from "react";
import {useAuth} from "../../contexts/Auth/AuthContext";
import {socket} from "../../App";
import {Chat} from "../Chat/Chat";
import { userInfoCall } from "../../api-calls";
import {useNavigate} from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const { user, dispatch, logout } = useAuth();
    const [chat, setChat] = useState("")

    const RefreshUser = (e) => {
        e.preventDefault();
        userInfoCall(user._id, dispatch).catch()
    }

    function handleContactsButtonClick() {
        navigate('/contacts');
    }

    function handleLogoutButtonClick() {
        logout();
        navigate('/login');
    }

    return (
        <div className="Home">
            <p> {user.username} ------- id: {user._id}
                <button
                    className="ml-10"
                    style={{color: "blue"}}
                    onClick={handleContactsButtonClick}
                > My contacts
                </button>

                <button
                    className="ml-10"
                    style={{color: "blue"}}
                    onClick={handleLogoutButtonClick}
                > Logout
                </button>
            </p>
            <br/>
            {user.chats.map((chat, index) => (
                <button className = "p-5" key={index} onClick={() =>
                {
                    socket.emit("join_chat", chat)
                    setChat(chat)
                }
                }>
                    {index + 1}) {chat}
                </button>
                ))
            }
            <br/>
            <button className="m-3 p-1" onClick={RefreshUser} style={{border: "solid 1px"}}>
                Refresh data
            </button>
            <br/>
            <hr/>
            <Chat socket={socket} chat={chat} />
        </div>

    )
}
