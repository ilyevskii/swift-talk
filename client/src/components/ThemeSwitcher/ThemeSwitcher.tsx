import React from 'react';
import './ThemeSwitcher.css';
import {LightMode, DarkMode} from '@mui/icons-material';
import {useThemeSwitcher} from "../../hooks/storeHooks/useThemeSwitcher";


export function ThemeSwitcher(): JSX.Element {

    const {isLightTheme, setIsLightTheme} = useThemeSwitcher();

    function handleLightThemeClick() {
        if (!isLightTheme) {
            setIsLightTheme(true);
        }
    }

    function handleDarkThemeClick() {
        if (isLightTheme) {
            setIsLightTheme(false);
        }
    }

    return (
        <ul className={`theme-switcher`}>
            <li className={`theme-switcher-element${isLightTheme ? ' active' : ''}`} onClick={handleLightThemeClick}>
                <LightMode className='theme-switcher-icon' />
                <p>Light</p>
                <input type="checkbox" className='theme-switcher-checkbox'/>
            </li>
            <li className={`theme-switcher-element${!isLightTheme ? ' active' : ''}`} onClick={handleDarkThemeClick}>
                <DarkMode className='theme-switcher-icon'/>
                <p>Dark</p>
                <input type="checkbox" className='theme-switcher-checkbox'/>
            </li>

        </ul>
    );
}
