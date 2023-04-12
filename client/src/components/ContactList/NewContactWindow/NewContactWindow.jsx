import './newcontactwindow.css';
import React, {useState} from "react";

export function NewContactWindow(props) {

    const [contactNumber, setContactNumber] = useState("");
    const {onClose, addNewContact, error} = props;
    const isDisabled = contactNumber.trim() === '';

    const handleChange = (event) => {
        setContactNumber(event.target.value);
    }
    return (
        <div className="new-contact-window">
            <div className="window-content">
                <div className="window-header">
                    <h2>New Contact</h2>
                </div>
                {error ? <div className="error">{error}</div> : <></>}
                <input type="text" id="phone_input" placeholder="Phone Number" onChange={handleChange}/>
                <div className="form-buttons">
                    <button className="submit-button" disabled={isDisabled} onClick={() => addNewContact(contactNumber)}>DONE</button>
                    <button onClick={() => onClose()}>CANCEL</button>
                </div>
            </div>
        </div>
    );
}


