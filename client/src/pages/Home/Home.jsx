import {useState, useEffect} from "react";
import {useAuth} from "../../contexts/Auth/AuthContext";
import {socket} from "../../App";
import {Chat} from "../Chat/Chat";
import { userInfoCall } from "../../api-calls";
import {useNavigate} from "react-router-dom";
import Header from "../../components/Header/Header";
import VerticalChatList from "../../components/ChatList/VerticalChatList/VerticalChatList";
import HorizontalChatList from "../../components/ChatList/HorizontalChatList/HorizontalChatList";
import ChatWindow from "../../components/Chat/ChatWindow/ChatWindow";
import axios from "axios";

import './home.css';

export default function Home() {
    const navigate = useNavigate();
    const { user, dispatch, logout } = useAuth();

    const [chat, setChat] = useState("")
    const [showVertical, setShowVertical] = useState(false);
    const [chatData, setChatData] = useState([]);

    const toggleChatList = () =>  {
        setShowVertical((prev) => !prev);
    }

    useEffect(() => {
        async function getChatData() {
            const chats = await axios.get(`http://localhost:3001/api/user/chats/${user._id}`);

            setChatData(chats.data);
        }

        getChatData();
    }, [user]);

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
        <div className="home-page">
            <div className="left-menu">
                <Header onToggle={toggleChatList}/>

                {showVertical ?
                    <VerticalChatList />
                    :
                    <HorizontalChatList />
                }
            </div>
            <div className="chat-window">
                <ChatWindow chat={'fg'} user_id={'df'}/>
            </div>

            {/*<p> {user.username} ------- id: {user._id}*/}
            {/*    <button*/}
            {/*        className="ml-10"*/}
            {/*        style={{color: "blue"}}*/}
            {/*        onClick={handleContactsButtonClick}*/}
            {/*    > My contacts*/}
            {/*    </button>*/}

            {/*    <button*/}
            {/*        className="ml-10"*/}
            {/*        style={{color: "blue"}}*/}
            {/*        onClick={handleLogoutButtonClick}*/}
            {/*    > Logout*/}
            {/*    </button>*/}
            {/*</p>*/}
            {/*<br/>*/}
            {/*{chatData.length ?*/}
            {/*    <div>*/}
            {/*    {chatData.map((chat, index) => (*/}
            {/*        <button className = "p-5" key={index} onClick={() =>*/}
            {/*        {*/}
            {/*            socket.emit("join_chat", chat._id)*/}
            {/*            setChat(chat._id)*/}
            {/*        }*/}
            {/*        }>*/}
            {/*            {index + 1}) {chat._id}*/}
            {/*        </button>*/}
            {/*    ))*/}
            {/*    }*/}
            {/*    </div>*/}
            {/*    :*/}
            {/*    <div>no chats</div>*/}
            {/*}*/}
            {/*<br/>*/}
            {/*<button className="m-3 p-1" onClick={RefreshUser} style={{border: "solid 1px"}}>*/}
            {/*    Refresh data*/}
            {/*</button>*/}
            {/*<br/>*/}
            {/*<hr/>*/}
            {/*<Chattt socket={socket} chat={chat._id} />*/}
        </div>
    )
}
