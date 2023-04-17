import './NewContactWindow.css';
import React, {useState, ChangeEvent} from "react";

interface Props {
    onClose: () => void;
    addNewContact: (phoneNumber: string) => void;
    error: string | null;
}

export function NewContactWindow(props: Props): JSX.Element {

    const [contactNumber, setContactNumber] = useState<string>("");
    const { onClose, addNewContact, error } = props;
    const isDisabled = contactNumber.trim() === '';

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setContactNumber(event.target.value);
    };

    return (
        <div className="new-contact-window">
            <div className="window-content">
                <div className="window-header">
                    <h2>New Contact</h2>
                </div>
                {error ? <div className="error">{error}</div> : null}
                <input type="text" id="phone_input" placeholder="Phone Number" onChange={handleChange}/>
                <div className="form-buttons">
                    <button className="submit-button" disabled={isDisabled} onClick={() => addNewContact(contactNumber)}>DONE</button>
                    <button onClick={onClose}>CANCEL</button>
                </div>
            </div>
        </div>
    );
}
