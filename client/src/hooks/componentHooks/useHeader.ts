import {useMenu, useSearchInput, useChatList} from "hooks";

interface HeaderHook {
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

    const {isMenuItemActive, isMenuOpen, setMenuActive, setMenuItemActive, setMenuItem} = useMenu();
    const {isSearchInputActive, setSearchInputActive} = useSearchInput();
    const {setIsVerticalChat} = useChatList();

    const handleBackButtonClick = (): void => {
        setSearchInputActive(!isSearchInputActive);
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
        if (!target.classList.contains("search-input") && !target.classList.contains("header-button")) {
            if (isSearchInputActive) setSearchInputActive(false);

            if (isMenuOpen || target.tagName === "path") {
                setMenuActive(false);
            }
        }
    };

    return {
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
