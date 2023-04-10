import React, { useState } from 'react';
import './modalmenu.css';
import {PersonOutlineOutlined, SettingsOutlined, InfoOutlined} from "@mui/icons-material";

export default function ModalMenu(props) {

    return (
        <>
            <div className="modal">
                <div className="menu">
                    <ul>
                        <li className="menu-item" onClick={() => {
                            props.changeMenuItem('contacts')
                            props.toggleButton(true);
                        }}>
                            <PersonOutlineOutlined className="menu-item-icon"/> Contacts
                        </li>
                        <li className="menu-item" onClick={() => {
                            props.changeMenuItem('settings')
                            props.toggleButton(true)
                        }}>
                            <SettingsOutlined className="menu-item-icon"/> Settings
                        </li>
                        <li className="menu-item" onClick={() => {
                            props.changeMenuItem('about')
                            props.toggleButton(true)
                        }}
                            ><InfoOutlined className="menu-item-icon"/> About
                        </li>
                    </ul>
                    <p className="description">by @ilyevskii.</p>
                </div>
            </div>
        </>
    );
}

