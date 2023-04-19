import "./Header.css";
import {Search, Dehaze, ArrowBack} from "@mui/icons-material";
import {useEffect} from "react";

import {ModalMenu} from "components";

import {useHeader} from "hooks";

export function Header(): JSX.Element {

    const {
        isSearchInputActive,
        isMenuOpen,
        isMenuItemActive,
        handleBackButtonClick,
        handleSearchbarClick,
        handleMenuButtonClick,
        setMenuItemActive,
        setIsVerticalChat,
        setMenuItem
    } = useHeader();

    useEffect(() => {
        setIsVerticalChat();
    }, [isSearchInputActive])

    return (
        <div className="header-container">
            <div className="header-buttons">
                <div className={isMenuOpen ? "main-menu" : "main-menu disappear"}>
                    <ModalMenu/>
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
                                    setMenuItem(null);
                                }}
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
