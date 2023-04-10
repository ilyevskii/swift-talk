import {useState, useEffect} from "react";
import {useAuth} from "../../contexts/Auth/AuthContext";
import {useNavigate} from "react-router-dom";

import Header from "../../components/Header/Header";
import VerticalChatList from "../../components/ChatList/VerticalChatList/VerticalChatList";
import HorizontalChatList from "../../components/ChatList/HorizontalChatList/HorizontalChatList";
import ChatWindow from "../../components/Chat/ChatWindow/ChatWindow";
import ContactList from "../../components/ContactList/ContactList";

import './home.css';
import {userRepo} from "../../serializer.js";

export default function Home({socket}) {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [showVertical, setShowVertical] = useState(false);
    const [chatData, setChatData] = useState([]);
    const [contactData, setContactData] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [leftMenuItem, setLeftMenuItem] = useState(null);

    const toggleChatList = () =>  {
        setShowVertical((prev) => !prev);
    }

     const changeLeftMenu = (item) => {
        setLeftMenuItem(item);
     }

    async function getChatData() {
        const res = await userRepo.getAllUserChats(user._id);
        setChatData(res);
    }

    async function getContactData() {
        const res = await userRepo.getAllUserContacts(user._id);
        console.log(res);
        setContactData(res);
    }

    useEffect(() => {
        getChatData();
    }, []);

    useEffect(() => {
        if (leftMenuItem === 'contacts') {
            getContactData();
        }
    }, [leftMenuItem])

    useEffect(() => {

        socket.on("receive_message", () => {
            getChatData();
        })

    }, [socket]);

    return (
        <div className="home-page">
            <div className="left-menu">
                <Header onToggle={toggleChatList} chooseMenuItem={changeLeftMenu}/>
                {
                    leftMenuItem ?
                        <>
                            {leftMenuItem === "contacts" ?
                                <ContactList contacts={contactData} setSelectedChat={setSelectedChat}/>
                                :
                                <>{leftMenuItem}</>
                            }
                        </>
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

        </div>
    )
}
