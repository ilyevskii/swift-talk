import './ContactList.css';
import {SetStateAction} from "react";
import {PersonAdd} from "@mui/icons-material";
import {useChatList, useContactList, useUserContacts} from "hooks";
import {useAuth} from "../../../contexts/Auth/AuthContext";


export function ContactList(): JSX.Element {

    const {user} = useAuth();
    const {user_contacts} = useUserContacts(user!._id);
    const {setSelectedChat} = useChatList();
    const {setContactFormOpen} = useContactList();

    const handleAddContactClick = () => {
        setContactFormOpen();
    };

    const image_url = 'https://avatars.mds.yandex.net/i?id=5d8db0440aae4c3265492d1b3f8de64dddf64453-8342484-images-thumbs&n=13';

    return (
        <>
            <div className="contact-list">
                {user_contacts!.length ?
                    <div className="contact-list-content">
                        {user_contacts!.map((contact) => (
                            <div key={contact._id} className="contact-preview" onClick={() => {
                                setSelectedChat(contact.chat_id);
                            }}>
                                <img src={image_url} alt={contact.username} className="contact-image" />
                                <div className="contact-info" >
                                    <h3 className="contact-name">{contact.username}</h3>
                                </div>
                            </div>
                        ))}
                        <button className={"add-contact-btn"} onClick={handleAddContactClick}><PersonAdd /></button>
                    </div>

                    :
                    <div className="no-user-contacts">
                        <p>No contacts yet.</p>
                        <button className={"add-contact-btn"} onClick={handleAddContactClick}><PersonAdd /></button>
                    </div>
                }
            </div>
        </>
    );
}
