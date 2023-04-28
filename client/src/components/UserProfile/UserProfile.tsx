import './UserProfile.css';
import React from 'react';
import {PhoneOutlined, AlternateEmailOutlined, InfoOutlined} from '@mui/icons-material';

export function UserProfile(): JSX.Element {

    const user = {
        photo: 'https://avatars.mds.yandex.net/i?id=5d8db0440aae4c3265492d1b3f8de64dddf64453-8342484-images-thumbs&n=13',
        name: 'Ilya',
        phone: '+375336227147',
        username: 'ilyevskii',
        bio: 'hi there!'
    }

    return (
        <div className="user-profile">
            <div className="user-profile-header">
                <img className="user-profile-image" src={user.photo} alt={user.name} />
                <h2 className="user-profile-name">{user.name}</h2>
            </div>
            <div className="content">
                <div className="item-preview">
                    <PhoneOutlined/>
                    <div className="user-item-description">
                        <p>{user.phone}</p>
                        <small>Phone</small>
                    </div>
                </div>
                <div className="item-preview">
                    <AlternateEmailOutlined/>
                    <div className="user-item-description">
                        <p>{user.username}</p>
                        <small>Username</small>
                    </div>
                </div>
                <div className="item-preview no-pointer">
                    <InfoOutlined/>
                    <div className="user-item-description">
                        <p>{user.bio}</p>
                        <small>Bio</small>
                    </div>
                </div>
            </div>
        </div>
    );
}
