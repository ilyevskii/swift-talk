import { createContext, useEffect, useReducer, useContext } from "react";
import AuthReducer from "./AuthReducer";


const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user") || null),
    error: false,
};


export const AuthContext = createContext(INITIAL_STATE);

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}


export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    function logout() {
        dispatch({type: 'LOGOUT'});
    }

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user])

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                error: state.error,
                logout,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
