import './NewContactWindow.css';
import React, {useState, ChangeEvent} from "react";
import {useContactList} from "hooks";

interface Props {
    addNewContact: (phoneNumber: string) => void;
}

export function NewContactWindow(props: Props): JSX.Element {

    const [contactNumber, setContactNumber] = useState<string>("");
    const {addNewContact} = props;
    const isDisabled: boolean = contactNumber.trim() === '';

    const {closeNewContactWindow, contactError} = useContactList();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setContactNumber(event.target.value);
    };

    return (
        <div className="new-contact-window">
            <div className="window-content">
                <div className="window-header">
                    <h2>New Contact</h2>
                </div>
                {contactError ? <div className="error">{contactError}</div> : null}
                <input type="text" id="phone_input" placeholder="Phone Number" onChange={handleChange}/>
                <div className="form-buttons">
                    <button className="submit-button" disabled={isDisabled} onClick={() => addNewContact(contactNumber)}>DONE</button>
                    <button onClick={closeNewContactWindow}>CANCEL</button>
                </div>
            </div>
        </div>
    );
}
