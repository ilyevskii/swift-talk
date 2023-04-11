import "./header.css";
import {Search, Dehaze, ArrowBack} from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import ModalMenu from "../ModalMenu/ModalMenu";

export default function Header(props) {
    const [isSearchInputActive, setSearchInputActive] = useState(false)
    const [isMenuItemActive, setMenuItemActive] = useState(false)
    const [isMenuOpen, setMenuOpen] = useState(false)

    const handleBackButtonClick = () => {
        setSearchInputActive((prev) => !prev);
    }

    const handleSearchbarClick = () => {
        if (!isSearchInputActive) {
            setSearchInputActive((prev) => !prev);
        }
    }

    const handleMenuButtonClick = () => {
        setMenuOpen((prev) => !prev)
    }

    const handleOutsideClick = (event) => {

        if (!event.target.classList.contains('search-input') && (!event.target.classList.contains('header-button'))) {
            setSearchInputActive(false);

            if(isMenuOpen || event.target.tagName === 'path') {
                setMenuOpen((prev) => !prev);
            }
        }

    }

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isMenuOpen]);


    useEffect( () => {
        props.onToggle();
    }, [isSearchInputActive])

    return (
        <div className="header-container">
            <div className="header-buttons">

                <div className={isMenuOpen ? "main-menu" : "main-menu disappear"} onClick={handleOutsideClick}>
                    <ModalMenu changeMenuItem={props.chooseMenuItem} toggleButton={setMenuItemActive}/>
                </div>
                { !isSearchInputActive ?
                    <>
                        { !isMenuItemActive ?
                            <Dehaze
                                className={`header-button${isMenuOpen ? ' rotate-out' : ' rotate-in'}`}
                                onClick={handleMenuButtonClick}
                            />
                            :
                            <ArrowBack
                                className={`header-button rotate-in`}
                                onClick={() => {
                                    setMenuItemActive(false);
                                    props.chooseMenuItem(null);
                                }
                                }
                            />
                        }
                    </>
                    :
                    <ArrowBack
                        className={`header-button${!isSearchInputActive ? ' rotate-out' : ' rotate-in'}`}
                        onClick={handleBackButtonClick}
                    />
                }
            </div>
            <div className="searchbar">
                <Search className={`search-icon`} />
                <input
                    placeholder="Search"
                    className="search-input"
                    onClick={handleSearchbarClick}
                />
            </div>
        </div>
    );
}
