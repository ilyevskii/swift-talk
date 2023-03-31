import { useContext, useRef } from "react";
import { registerCall } from "../../api-calls";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import {useNavigate} from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const phone = useRef();
    const password = useRef();
    const username = useRef();
    const { dispatch } = useContext(AuthContext);

    function handleLoginButtonClick() {
        navigate('/login');
    }

    const handleClick = (e) => {
        e.preventDefault();

        registerCall(
            { phone_number: phone.current.value,
              password: password.current.value,
                username: username.current.value
            },
            dispatch
        ).catch();


    };

    return (
        <div className="login container mx-auto align-middle p-5">
            <p className="mt-10">Register page</p>
            <form className="loginBox mt-10" onSubmit={handleClick}>
                <input
                    style={{display: "block", border: "1px solid"}}
                    placeholder="Username"
                    type="username"
                    required
                    minLength="6"
                    className="usernameInput p-2 pl-4 pr-4"
                    ref={username}
                />
                <input
                    style={{display: "block", border: "1px solid"}}
                    placeholder="Phone"
                    type="phone"
                    required
                    className="phoneInput p-2 pl-4 pr-4 mt-3"
                    ref={phone}
                />
                <input
                    style={{display: "block", border: "1px solid"}}
                    placeholder="Password"
                    type="password"
                    required
                    minLength="6"
                    className="passwordInput p-2 pl-4 pr-4 mt-3"
                    ref={password}
                />
                <button
                    style={{display: "block", border: "1px solid"}}
                    className="registerButton p-2 pl-4 pr-4 mt-10"
                    type="submit">
                    Register
                </button>

                <p className="mt-10"> Already have an account?
                    <button
                        className="ml-1"
                        style={{color: "blue"}}
                        onClick={handleLoginButtonClick}
                    > Login</button>
                </p>
            </form>
        </div>
    );
}
