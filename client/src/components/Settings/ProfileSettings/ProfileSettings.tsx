import './ProfileSettings.css';
import React, {ChangeEvent, useState} from 'react';

import {Done} from "@mui/icons-material";
import {useAuth} from "../../../contexts/Auth/AuthContext";
import {useUserInfo} from "../../../hooks/repoHooks/UserHooks";


export function ProfileSettings(): JSX.Element {

    const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const {user} = useAuth();
    const {user_info, refresh_user_info, setUserInfo} = useUserInfo(user!._id);

    const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLastName(event.target.value);
    };

    const handleBioChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setBio(event.target.value);
    };

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setUsername(event.target.value);
    };

    const handleChangeClick = async (): Promise<void> => {
        console.log('aaa');
        const username_regexp: RegExp = /^[a-z0-9_]{5,15}$/;
        if (username_regexp.test(username)) {
            const newUserInfo = {...user_info};

            firstName && (newUserInfo.first_name = firstName);
            lastName && (newUserInfo.last_name = lastName);
            bio && (newUserInfo.bio = bio);
            username && (newUserInfo.username = username);

            await setUserInfo(newUserInfo);
        }
        else {
            setError(true);
        }

    }

    const image_url = 'https://avatars.mds.yandex.net/i?id=5d8db0440aae4c3265492d1b3f8de64dddf64453-8342484-images-thumbs&n=13';

    return (
        <div className="left-container profile-settings-container">
            <div className="new-group-chat-info">
                <img
                    className="new-group-chat-photo"
                    src={image_url}
                    alt={"new_chat_photo"}
                />
                <div className="profile-settings-inputs">
                    <input
                        type="text"
                        placeholder="First name"
                        className="profile-input"
                        defaultValue={user_info.first_name}
                        onChange={handleFirstNameChange}
                    />
                    <input
                        type="text"
                        placeholder="Last name"
                        className="profile-input"
                        defaultValue={user_info.last_name}
                        onChange={handleLastNameChange}
                    />
                    <input
                        type="text"
                        placeholder="bio"
                        className="profile-input"
                        defaultValue={user_info.bio}
                        onChange={handleBioChange}
                    />
                    <p className="profile-settings-footer">
                        Any details such as age, occupation or city. <br/>
                        Example: 19 y.o. bezdelnick from Drogichin
                    </p>
                </div>
                <div className="profile-settings-username">
                    <p className="setting-header">Username</p>
                    <input
                        type="text"
                        placeholder="Username (required)"
                        className={`profile-input username ${error ? "username-error" : ""}`}
                        minLength={5}
                        maxLength={15}
                        defaultValue={user_info.username}
                        onChange={handleUsernameChange}
                    />
                    <p className="profile-settings-footer">
                        You can choose a username on <b>SwiftTalk.</b><br/>
                        You can use a–z, 0–9 and underscores. <br/>Minimum length is 5 characters.
                    </p>
                </div>
            </div>
            {(username || (user_info && user_info.username)) &&
                <button className={"add-contact-btn"} onClick={handleChangeClick}><Done /></button>
            }
        </div>
    );
}
