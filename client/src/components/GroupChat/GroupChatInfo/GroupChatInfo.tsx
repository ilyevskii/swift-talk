import './GroupChatInfo.css';
import React, {ChangeEvent, useState} from 'react';

import {ArrowForward} from "@mui/icons-material";
import {useContactList, useGroupChat, useImageUploader} from "hooks";
import {NewMember} from "../../../store/reducers";
import {socket} from "../../../App";
import {useAuth} from "../../../contexts/Auth/AuthContext";
import {ImageUploader} from "../../ImageUploader/ImageUploader";


export function GroupChatInfo(): JSX.Element {

    const {newMembers} = useGroupChat();
    const {user} = useAuth();
    const [chatName, setChatName] = useState<string>("");

    const {group_image, setGroupImage} = useImageUploader();

    const handleCreateChatClick = async(): Promise<void> => {

        const chatData = {
            name: chatName,
            users: [...newMembers.map((mem: NewMember) => mem.id), user!._id],
            photo: ""
        }
        await socket.emit("new_group", chatData);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChatName(event.target.value);
    };

    const handlePhotoClick = () => {
        const uploader: HTMLInputElement | null = document.querySelector(".image-uploader");
        uploader?.click();
    }

    const image_url = 'https://avatars.mds.yandex.net/i?id=5d8db0440aae4c3265492d1b3f8de64dddf64453-8342484-images-thumbs&n=13';

    return (
        <div className="left-container contacts-container">
            <div className="new-group-chat-info">
                <img
                    className="new-group-chat-photo"
                    src={group_image ? URL.createObjectURL(group_image) : image_url}
                    alt={"new_chat_photo"}
                    onClick={handlePhotoClick}
                />
                <div style={{display: "none"}}>
                    <ImageUploader type="group"/>
                </div>
                <input
                    type="text"
                    placeholder="Group name"
                    className="new-group-chat-name-input"
                    onChange={handleInputChange}
                />
                <div className="new-group-chat-members">
                    <p>Members:</p>
                    {newMembers.map((member: NewMember) => (
                        <div className="group-chat-member-preview" key={member.id}>
                            <img
                                src={image_url}
                                className="group-chat-member-preview-photo"
                            />
                            <p>{member.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            {chatName &&
                <button className={"add-contact-btn"} onClick={handleCreateChatClick}><ArrowForward /></button>
            }
        </div>
    );
}
