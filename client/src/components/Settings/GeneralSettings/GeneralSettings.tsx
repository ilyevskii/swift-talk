import './GeneralSettings.css';

import React from 'react';

import {ThemeSwitcher} from "../../ThemeSwitcher/ThemeSwitcher";

export function GeneralSettings(): JSX.Element {

    return (
        <div className="left-container">
            <div className="settings-content">
                <ThemeSwitcher/>
            </div>
        </div>
    );
}
