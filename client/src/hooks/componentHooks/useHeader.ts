import {useMenu, useSearchInput} from "hooks";

interface HeaderHook {
    isSearchInputActive: boolean;
    isMenuItemActive: boolean;
    isMenuOpen: boolean;
    handleBackButtonClick: () => void;
    handleSearchbarClick: () => void;
    handleMenuButtonClick: () => void;
    setMenuItemActive: (state?: boolean) => void;
    handleOutsideClick: (event: any) => any;
}

export function useHeader(): HeaderHook {

    const {isMenuItemActive, isMenuOpen, setMenuActive, setMenuItemActive} = useMenu();
    const {isSearchInputActive, setSearchInputActive} = useSearchInput();

    const handleBackButtonClick = (): void => {
        setSearchInputActive(!isSearchInputActive);
    };

    const handleSearchbarClick = (): void => {
        if (!isSearchInputActive) {
            setSearchInputActive(true);
        }
    };

    const handleMenuButtonClick = (): void => {
        setMenuActive(!isMenuItemActive);
    };

    const handleOutsideClick = (event: MouseEvent): void => {
        const target: HTMLElement = event.target as HTMLElement;
        if (!target.classList.contains("search-input") && (!target.classList.contains("header-button"))) {
            setSearchInputActive(false);
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
        setMenuItemActive
    };
}
