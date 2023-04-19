import "./Header.css";
import {Search, Dehaze, ArrowBack} from "@mui/icons-material";
import {useEffect} from "react";
import {ModalMenu} from "components";

import {useHeader} from "hooks";

interface HeaderProps {
    onToggle: () => void;
    chooseMenuItem: (menuItem: string | null) => void;
}

export function Header(props: HeaderProps): JSX.Element {

    const {
        isSearchInputActive,
        isMenuOpen,
        isMenuItemActive,
        handleBackButtonClick,
        handleSearchbarClick,
        handleMenuButtonClick,
        handleOutsideClick,
        setMenuItemActive
    } = useHeader();

    useEffect(() => {
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
