import React, { useState } from 'react';
import {Send} from "@mui/icons-material";
import './messageform.css';

export function MessageForm(props) {
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setMessage(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.submitFunc(message);
        setMessage('');
    }

    return (
        <form className="message-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="message-input"
                placeholder="Message"
                value={message}
                onChange={handleChange}
            />
            <button className="send-button" type="submit">
                <Send/>
            </button>
        </form>
    );
}

