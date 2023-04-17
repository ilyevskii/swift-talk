import React from 'react';
import './ModalMenu.css';
import { PersonOutlineOutlined, SettingsOutlined, InfoOutlined } from "@mui/icons-material";

interface ModalMenuProps {
    changeMenuItem: (item: string | null) => void;
    toggleButton: (state: boolean) => void;
}

export function ModalMenu(props: ModalMenuProps) {

    return (
        <>
            <div className="modal">
                <div className="menu">
                    <ul>
                        <li className="menu-item" onClick={() => {
                            props.changeMenuItem('contacts')
                            props.toggleButton(true);
                        }}>
                            <PersonOutlineOutlined className="menu-item-icon" /> Contacts
                        </li>
                        <li className="menu-item" onClick={() => {
                            props.changeMenuItem('settings')
                            props.toggleButton(true)
                        }}>
                            <SettingsOutlined className="menu-item-icon" /> Settings
                        </li>
                        <li className="menu-item" onClick={() => {
                            props.changeMenuItem('about')
                            props.toggleButton(true)
                        }}
                        ><InfoOutlined className="menu-item-icon" /> About
                        </li>
                    </ul>
                    <p className="description">SwiftTalk by @ilyevskii.</p>
                </div>
            </div>
        </>
    );
}
