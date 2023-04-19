import './Home.css';

import {useState, useEffect} from "react";
import {useAuth} from "../../contexts/Auth/AuthContext";
import {useChatList, useHeader, useMenu, useUserChats, useUserContacts} from "hooks";

import {HorizontalChatList, VerticalChatList, Header, ChatWindow, ContactList, NewContactWindow} from "components";


type HomeProps = {
    socket: any;
};

export function Home({socket}: HomeProps) {

    const {user} = useAuth();

    const {isVerticalChatNow, selectedChat, setSelectedChat} = useChatList();
    const {handleOutsideClick} = useHeader();
    const {menuItem} = useMenu();

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
        <div className="home-page" onClick={handleOutsideClick}>
            <div className="left-menu">
                <Header/>
                {
                    menuItem ?
                        <>
                            {!isContactsLoading ?
                                <>
                                    {menuItem === "contacts" ?
                                        <ContactList
                                            contacts={user_contacts!}
                                            setSelectedChat={setSelectedChat}
                                            setFormOpen={setContactFormOpen}/>
                                        :
                                        <>{menuItem}</>
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
                                    {isVerticalChatNow ?
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
