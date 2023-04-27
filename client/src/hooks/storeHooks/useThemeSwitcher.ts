import {useSelector, useDispatch} from "react-redux";
import {updateIsLightTheme, RootState} from "../../store/reducers/index";
import {Dispatch} from "react";
import {AnyAction} from "redux";

interface switcherHook {
    isLightTheme: boolean;
    setIsLightTheme: (state: boolean | undefined) => void;
}

export function useThemeSwitcher(): switcherHook {
    const dispatch: Dispatch<AnyAction> = useDispatch();
    const isLightTheme: boolean = useSelector((state: RootState) => state.theme_switcher.isLightThemeNow);

    const setIsLightTheme = (state?: boolean): void => {
        if (state) {
            dispatch(updateIsLightTheme(state));
        }
        else {
            dispatch(updateIsLightTheme(!isLightTheme));
        }
    }

    return {
        isLightTheme,
        setIsLightTheme
    };
}
