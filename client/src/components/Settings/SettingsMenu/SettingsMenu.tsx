import './SettingsMenu.css';

import React from 'react';

import {useMenu} from "hooks";
import {useAuth} from "../../../contexts/Auth/AuthContext";
import {ThemeSwitcher} from "../../ThemeSwitcher/ThemeSwitcher";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {UserProfile} from "../../UserProfile/UserProfile";

export function SettingsMenu(): JSX.Element {

    const {user} = useAuth();
    const {setMenuItem} = useMenu();

    const image_url: string = 'https://avatars.mds.yandex.net/i?id=5d8db0440aae4c3265492d1b3f8de64dddf64453-8342484-images-thumbs&n=13';

    function handleGeneralSettingsClick(): void {
        setMenuItem('general settings');
    }

    return (
        <div className="settings">
            <UserProfile/>
            <div className="content">
                <div className="item-preview" onClick={handleGeneralSettingsClick}>
                    <SettingsOutlinedIcon/>
                    <p>General settings</p>
                </div>
            </div>
        </div>
    );
}
