import './Home.css';

import {useState, useEffect} from "react";
import {useAuth} from "../../contexts/Auth/AuthContext";
import {useUserChats, useUserContacts} from "../../hooks/UserHooks";

import Header from "../../components/Header/Header";
import VerticalChatList from "../../components/ChatList/VerticalChatList/VerticalChatList";
import HorizontalChatList from "../../components/ChatList/HorizontalChatList/HorizontalChatList";
import ChatWindow from "../../components/Chat/ChatWindow/ChatWindow";
import ContactList from "../../components/ContactList/List/ContactList";
import {NewContactWindow} from "../../components/ContactList/NewContactWindow/NewContactWindow";

type HomeProps = {
    socket: any;
};

export default function Home({socket}: HomeProps) {

    const {user} = useAuth();

    const [showVertical, setShowVertical] = useState<boolean>(true);
    const [selectedChat, setSelectedChat] = useState<string | null>(null);
    const [leftMenuItem, setLeftMenuItem] = useState<string | null>(null);
    const [isContactFormOpen, setContactFormOpen] = useState<boolean>(false);
    const [newContactError, setContactError] = useState<string | null>(null);

    const {
        isChatsLoading,
        isChatError,
        user_chats,
        chat_error,
        refresh_chats,
    } = useUserChats(user!._id);

    const {
        isContactsLoading,
        isContactsError,
        user_contacts,
        contacts_error,
        refresh_contacts,
    } = useUserContacts(user!._id);

    const closeNewContactWindow = () => {
        setContactFormOpen(false);
        setContactError("");
    };

    useEffect(() => {
        if (!isContactFormOpen) refresh_chats().catch();
    }, [isContactFormOpen, refresh_chats]);

    async function addNewContact(contact_number: string) {

        await socket.emit("add_contact", {
            socket_id: socket.id,
            user_id: user!._id,
            new_contact_number: contact_number,
        });
    }

    useEffect(() => {

        socket.on("receive_message", () => {
            refresh_chats().catch();
        });

        socket.on("new_contact", (data: {error: string | boolean; chat_id?: string}) => {

            if (data.error === false) {

                refresh_contacts().then(() => {
                    setContactFormOpen(false);
                    setContactError(null);
                });

                setSelectedChat(data.chat_id as string);
                refresh_chats();

            } else {
                setContactError(data.error as string);
            }
        });
    }, [socket, refresh_chats, refresh_contacts]);

    return (
        <div className="home-page">
            <div className="left-menu">
                <Header
                    onToggle={() => setShowVertical((prev) => !prev)}
                    chooseMenuItem={(item) => setLeftMenuItem(item)}
                />
                {
                    leftMenuItem ?
                        <>
                            {!isContactsLoading ?
                                <>
                                    {leftMenuItem === "contacts" ?
                                        <ContactList
                                            contacts={user_contacts!}
                                            setSelectedChat={setSelectedChat}
                                            setFormOpen={setContactFormOpen}/>
                                        :
                                        <>{leftMenuItem}</>
                                    }
                                </>
                                :
                                <div>Loading...</div>
                            }

                        </>
                        :
                        <>
                            {!isChatsLoading ?
                                <>
                                    {showVertical ?
                                        <VerticalChatList
                                            socket={socket}
                                            chats={user_chats!}
                                            setSelectedChat={setSelectedChat}/>
                                        :
                                        <HorizontalChatList
                                            socket={socket}
                                            chats={user_chats!}
                                            setSelectedChat={setSelectedChat}/>
                                    }
                                </>
                                :
                                <div>Loading</div>
                            }

                        </>
                }
            </div>
            {selectedChat ?
                <div className="chat-window">
                    <ChatWindow
                        socket={socket}
                        selectedChat={selectedChat}
                        user_id={user!._id}
                        refresh_chats={refresh_chats}/>
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
