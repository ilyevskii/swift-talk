import {useMenu, useSearchInput, useChatList, useChatMessage} from "hooks";

interface HeaderHook {
    menuItem: string | null;
    isSearchInputActive: boolean;
    isMenuItemActive: boolean;
    isMenuOpen: boolean;
    handleBackButtonClick: () => void;
    handleSearchbarClick: () => void;
    handleMenuButtonClick: () => void;
    setMenuItemActive: (state?: boolean) => void;
    handleOutsideClick: (event: any) => any;
    setIsVerticalChat: (state?: boolean) => void;
    setMenuItem: (item: string | null) => void;
}

export function useHeader(): HeaderHook {

    const {menuItem, isMenuItemActive, isMenuOpen, setMenuActive, setMenuItemActive, setMenuItem} = useMenu();
    const {isSearchInputActive, setSearchInputActive} = useSearchInput();
    const {setIsVerticalChat} = useChatList();
    const {setDeleteWindow} = useChatMessage();

    const handleBackButtonClick = (): void => {

        if (isMenuItemActive) {
            if (menuItem === "general settings") {
                setMenuItem("settings");
            }
            else {
                setMenuItemActive(false);
                setMenuItem(null);
            }
        }
        else {
            setSearchInputActive(!isSearchInputActive);
        }

    };

    const handleSearchbarClick = (): void => {
        if (!isSearchInputActive) {
            setSearchInputActive(true);
        }
    };

    const handleMenuButtonClick = (): void => {
        setMenuActive(!isMenuOpen);
    };

    const handleOutsideClick = (event: MouseEvent): void => {
        const target: HTMLElement = event.target as HTMLElement;
        console.log(target.classList);
        if (!target.classList.contains("search-input") && !target.classList.contains("header-button")) {
            if (isSearchInputActive) setSearchInputActive(false);

            if (isMenuOpen || target.tagName === "path") {
                setMenuActive(false);
            }
        }

        if(!target.classList.contains('menu-item')) {
            setDeleteWindow(null);
        }
    };

    return {
        menuItem,
        isSearchInputActive,
        isMenuOpen,
        isMenuItemActive,
        handleBackButtonClick,
        handleSearchbarClick,
        handleMenuButtonClick,
        handleOutsideClick,
        setMenuItemActive,
        setIsVerticalChat,
        setMenuItem
    };
}
