import {useState, useEffect} from "react";
import {useAuth} from "../../contexts/Auth/AuthContext";
import {useNavigate} from "react-router-dom";

import Header from "../../components/Header/Header";
import VerticalChatList from "../../components/ChatList/VerticalChatList/VerticalChatList";
import HorizontalChatList from "../../components/ChatList/HorizontalChatList/HorizontalChatList";
import ChatWindow from "../../components/Chat/ChatWindow/ChatWindow";
import ContactList from "../../components/ContactList/List/ContactList";
import {NewContactWindow} from "../../components/ContactList/NewContactWindow/NewContactWindow";

import './home.css';
import {chatRepo, userRepo} from "../../serializer.js";

export default function Home({socket}) {

    const { user } = useAuth();

    const [showVertical, setShowVertical] = useState(false);
    const [chatData, setChatData] = useState([]);
    const [contactData, setContactData] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [leftMenuItem, setLeftMenuItem] = useState(null);
    const [isContactFormOpen, setContactFormOpen] = useState(false);

    const [newContactError, setContactError] = useState(null);

    const changeLeftMenu = (item) => {
        setLeftMenuItem(item);
    }

    const closeNewContactWindow = () => {
        setContactFormOpen(false);
        setContactError(false);
    }

    async function getChatData() {
        const res = await userRepo.getAllUserChats(user._id);
        setChatData(res);
    }

    async function getContactData() {
        const res = await userRepo.getAllUserContacts(user._id);
        setContactData(res);
    }

    async function addNewContact(contact_number) {
        await socket.emit("add_contact", {socket_id: socket.id, user_id: user._id, new_contact_number: contact_number});
    }

    useEffect(() => {
        getChatData().catch(err=> console.log(err.toString()));
    }, []);

    useEffect(() => {
        if (leftMenuItem === 'contacts') {
            getContactData().catch(err=> console.log(err.toString()));
        }
    }, [leftMenuItem])

    useEffect(() => {

        socket.on("receive_message", () => {
            getChatData().catch();
        })

        socket.on("new_contact", (data) => {
            if (data.error === false) {
                getContactData().then(() => {
                    setContactFormOpen(false);
                    setContactError(null);
                });
            }
            else {
                setContactError(data.error);
            }

        })


    }, [socket]);

    useEffect(() => {
        getChatData().catch(err=> console.log(err.toString()));
    }, [isContactFormOpen])

    return (
        <div className="home-page">
            <div className="left-menu">
                <Header
                    onToggle={() => setShowVertical((prev) => !prev)}
                    chooseMenuItem={changeLeftMenu}/>
                {
                    leftMenuItem ?
                        <>
                            {leftMenuItem === "contacts" ?
                                <ContactList
                                    contacts={contactData}
                                    setSelectedChat={setSelectedChat}
                                    setFormOpen={setContactFormOpen}/>
                                :
                                <>{leftMenuItem}</>
                            }
                        </>
                        :
                        <>
                            {showVertical ?
                                <VerticalChatList
                                    socket={socket}
                                    chats={chatData}
                                    setSelectedChat={setSelectedChat}/>
                                :
                                <HorizontalChatList
                                    socket={socket}
                                    chats={chatData}
                                    setSelectedChat={setSelectedChat}/>
                            }
                        </>
                }
            </div>
            {selectedChat ?
                <div className="chat-window">
                    <ChatWindow
                        socket={socket}
                        selectedChat={selectedChat}
                        user_id={user._id}/>
                </div>
                :
                <p>Choose chat to start messaging!</p>
            }

            {isContactFormOpen ?
                <NewContactWindow
                    onClose={closeNewContactWindow}
                    addNewContact={addNewContact}
                    error={newContactError}/>
                :
                <></>
            }

        </div>
    )
}
