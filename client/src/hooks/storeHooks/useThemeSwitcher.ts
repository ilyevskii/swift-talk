import {useSelector, useDispatch} from "react-redux";
import {updateTheme, RootState} from "../../store/reducers/index";
import {Dispatch} from "react";
import {AnyAction} from "redux";

interface switcherHook {
    color_theme: string;
    setTheme: (state: string) => void;
}

export function useThemeSwitcher(): switcherHook {
    const dispatch: Dispatch<AnyAction> = useDispatch();
    const color_theme: string = useSelector((state: RootState) => state.theme_switcher.theme);

    const setTheme = (state: string): void => {
        dispatch(updateTheme(state));
    }

    return {
        color_theme,
        setTheme
    };
}
