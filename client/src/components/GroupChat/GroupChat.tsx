import './GroupChat.css';
import React, {useState} from 'react';

import {ArrowForward} from "@mui/icons-material";
import {useChatList, useContactList, useGroupChat, useUserContacts} from "hooks";
import {useAuth} from "../../contexts/Auth/AuthContext";
import {ContactDTO} from "../../repositories";
import {NewMember} from "../../store/reducers";


export function GroupChatList(): JSX.Element {

    const {user} = useAuth();
    const {user_contacts} = useUserContacts(user!._id);
    const {setSelectedChat} = useChatList();
    const {setContactFormOpen} = useContactList();
    const {newMembers, setNewMember, removeNewMember, findNewMember} = useGroupChat();

    const handleAddContactClick = () => {
        setContactFormOpen();
    };

    const handleContactPreviewClick = (newMember: ContactDTO): void => {

        const member: NewMember = {
            id: newMember._id,
            name: newMember.username
        }

        if (findNewMember(member)) {
            removeNewMember(member);
        }
        else {
            setNewMember(member);
        }

    }

    const isContactToggled = (contact: ContactDTO) : boolean => {
        const member: NewMember = {
            id: contact._id,
            name: contact.username
        }
        return findNewMember(member);
    }

    const image_url = 'https://avatars.mds.yandex.net/i?id=5d8db0440aae4c3265492d1b3f8de64dddf64453-8342484-images-thumbs&n=13';

    return (
        <>
            <div className="left-container contacts-container">
                <div className="chosen-members">
                    {newMembers.length ? <div>Chosen members</div> : <div>Choose members...</div>}
                </div>
                {user_contacts!.length ?
                    <div className="contact-list-content">
                        {user_contacts!.map((contact: ContactDTO) => (

                            <div
                                key={contact._id}
                                className={`contact-preview${isContactToggled(contact) ? " chosen" : ""}`}
                                onClick={() => {
                                handleContactPreviewClick(contact)
                            }}>
                                <input
                                    className="contacts-checkbox"
                                    type="checkbox"
                                    checked={isContactToggled(contact)}
                                    onChange={() => {}}
                                />
                                <img src={image_url} alt={contact.username} className="contact-image" />
                                <div className="contact-info" >
                                    <h3 className="contact-name">{contact.username}</h3>
                                </div>
                            </div>
                        ))}
                        <button className={"add-contact-btn"} onClick={handleAddContactClick}><ArrowForward /></button>
                    </div>

                    :
                    <div className="no-user-contacts">
                        <p>No contacts yet.</p>
                        <button className={"add-contact-btn"} onClick={handleAddContactClick}><ArrowForward /></button>
                    </div>
                }
            </div>
        </>
    );
}
