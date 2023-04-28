import React from 'react';
import './ThemeSwitcher.css';
import {LightMode, DarkMode} from '@mui/icons-material';
import {useThemeSwitcher} from "../../hooks/storeHooks/useThemeSwitcher";


export function ThemeSwitcher(): JSX.Element {

    const {color_theme, setTheme} = useThemeSwitcher();

    function handleLightThemeClick() {
        if (color_theme === "dark-theme") {
            setTheme('light-theme');
        }
    }

    function handleDarkThemeClick() {
        if (color_theme === 'light-theme') {
            setTheme('dark-theme');
        }
    }

    return (
        <>
            <p className='theme-switcher-header'>Theme</p>
            <ul className={`theme-switcher`}>
                <li className={`theme-switcher-element${color_theme === 'light-theme' ? ' active' : ''}`}
                    onClick={handleLightThemeClick}>
                    <LightMode className='theme-switcher-icon'/>
                    <p>Light</p>
                    <input type="checkbox" className='theme-switcher-checkbox'/>
                </li>
                <li className={`theme-switcher-element${color_theme === 'dark-theme' ? ' active' : ''}`}
                    onClick={handleDarkThemeClick}>
                    <DarkMode className='theme-switcher-icon'/>
                    <p>Dark</p>
                    <input type="checkbox" className='theme-switcher-checkbox'/>
                </li>

            </ul>
        </>

    )
}