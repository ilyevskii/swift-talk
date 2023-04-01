import {useEffect, useState} from "react";
import {useAuth} from "../../contexts/Auth/AuthContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {userInfoCall} from "../../api-calls";

export function Contacts({socket}) {
    const { user, dispatch } = useAuth();
    const navigate = useNavigate();
    const [currentNumber, setCurrentNumber] = useState("");
    const [contacts, setContacts] = useState([]);
    const [newContactError, setNewContactError] = useState("");

    function handleBackButtonClick() {
        navigate('/');
    }

    const RefreshUser = (e) => {
        e.preventDefault();
        userInfoCall(user._id, dispatch).catch()
    }

    const fetchData = async () => {
        const results = await Promise.all(
            user.contacts.map(async (id) => {
                const response = await axios.get("http://localhost:3001/api/user/" + id);
                return response.data;

            })
        );
        setContacts(results);
    };


    useEffect(() => {

        socket.on("new_contact", (data) => {

            if (data.error) {
                setNewContactError(data.error);
            }
            else {
                userInfoCall(user._id, dispatch).then()
            }
        })

        fetchData().then();
    }, []);

    useEffect(() => {
        fetchData().then()
    }, [user])
    const addContact = async () => {

        if (currentNumber) {

            if (currentNumber === user.phone_number) {
                setNewContactError("You can't add yourself to your contacts!")
            }
            else {
                const data = {
                    user_id: user._id,
                    socket_id: socket.id,
                    new_contact_number: currentNumber
                }
                await socket.emit("add_contact", data);
                setCurrentNumber("");
                setNewContactError("");
            }

        }
    }

    return (
        <div className="contacts m-10">
            <div>Your contacts:</div>
            {user.contacts ?
                <div className="existing-contacts mt-10">
                    {contacts.map((contact, index) => (
                        <div
                            className="contact mt-3"
                            key={index}>
                            {index + 1}) {contact.username} ({contact.phone_number})
                        </div>
                    ))}
                </div>
                :
                <p>You have 0 contacts.<br/> Would you like to add?</p>
            }
            <div className="new-contact-form mt-10">
                <p className="mt-4 mb-2" style={{color: "red"}}>{newContactError}</p>
                <input
                    className="p-2"
                    style={{border: "solid 1px"}}
                    type='text'
                    value={currentNumber}
                    placeholder='Input phone number'
                    onChange={(event) => {
                        setCurrentNumber(event.target.value);
                    }}
                />
                <button
                    className="ml-5 p-1 pl-5 pr-5"
                    onClick={addContact}
                    style={{border: "solid 1px"}}
                >Add contact</button>
            </div>
            <button className="mt-3 mr-10 p-1" onClick={RefreshUser} style={{border: "solid 1px"}}>
                Refresh data
            </button>
            <button
                onClick={handleBackButtonClick}
                className="back-button mt-10 ml-5"
                style={{color: "blue"}}>Back to chats
            </button>
        </div>

    );
}
