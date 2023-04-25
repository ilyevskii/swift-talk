import React, {useContext, useRef, FormEvent, Dispatch} from "react";
import {loginCall} from "../../api-calls";
import {AuthContext, AuthContextInterface} from "../../contexts/Auth/AuthContext";
import {useNavigate} from "react-router-dom";

export function Login() {
    const navigate = useNavigate();
    const phone = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const { dispatch }: AuthContextInterface = useContext<AuthContextInterface>(AuthContext)!;

    function handleRegisterButtonClick() {
        navigate('/register');
    }

    const handleClick = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (phone.current && password.current) {
            loginCall(
                { phone_number: phone.current.value, password: password.current.value },
                dispatch
            ).catch();
        }
    };

    return (
        <div className="login container mx-auto align-middle p-5">
            <p className="mt-10">Login page</p>
            <form className="loginBox mt-10" onSubmit={handleClick}>
                <input
                    style={{ display: "block", border: "1px solid" }}
                    placeholder="Phone"
                    type="phone"
                    required
                    className="phoneInput p-2 pl-4 pr-4"
                    ref={phone}
                />
                <input
                    style={{ display: "block", border: "1px solid" }}
                    placeholder="Password"
                    type="password"
                    required
                    minLength={6}
                    className="passwordInput p-2 pl-4 pr-4 mt-3"
                    ref={password}
                />
                <button
                    style={{ display: "block", border: "1px solid" }}
                    className="loginButton p-2 pl-4 pr-4 mt-10"
                    type="submit"
                >
                    Log In
                </button>

                <p className="mt-10">
                    Don't have an account?
                    <button
                        className="ml-1"
                        style={{ color: "blue" }}
                        onClick={handleRegisterButtonClick}
                    >
                        Register
                    </button>
                </p>
            </form>
        </div>
    );
}
