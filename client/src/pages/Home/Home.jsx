import {useState, useEffect} from "react";
import {useAuth} from "../../contexts/Auth/AuthContext";
import { userInfoCall } from "../../api-calls";
import {useNavigate} from "react-router-dom";
import Header from "../../components/Header/Header";
import VerticalChatList from "../../components/ChatList/VerticalChatList/VerticalChatList";
import HorizontalChatList from "../../components/ChatList/HorizontalChatList/HorizontalChatList";
import ChatWindow from "../../components/Chat/ChatWindow/ChatWindow";

import './home.css';
import {userRepo} from "../../serializer.js";

export default function Home({socket}) {
    const navigate = useNavigate();
    const { user, dispatch, logout } = useAuth();

    const [showVertical, setShowVertical] = useState(false);
    const [chatData, setChatData] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [leftMenuItem, setLeftMenuItem] = useState(null);

    const toggleChatList = () =>  {
        setShowVertical((prev) => !prev);
    }

     const changeLeftMenu = (item) => {
        console.log(item);
        setLeftMenuItem(item);
     }

    async function getChatData() {
        const res = await userRepo.getAllUserChats(user._id);
        setChatData(res);
    }

    useEffect(() => {
        getChatData();
    }, []);

    useEffect(() => {

        socket.on("receive_message", () => {
            getChatData();
        })

    }, [socket]);

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
                <Header onToggle={toggleChatList} chooseMenuItem={changeLeftMenu}/>
                {
                    leftMenuItem ?
                        <div>{leftMenuItem}</div>
                        :
                        <>
                            {showVertical ?
                                <VerticalChatList socket={socket} chats={chatData} setSelectedChat={setSelectedChat}/>
                                :
                                <HorizontalChatList socket={socket} chats={chatData} setSelectedChat={setSelectedChat}/>
                            }
                        </>
                }
            </div>
            {selectedChat ?
                <div className="chat-window">
                    <ChatWindow socket={socket} chat={selectedChat} user_id={user._id}/>
                </div>
                :
                <p>Choose chat to start messaging!</p>
            }

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
