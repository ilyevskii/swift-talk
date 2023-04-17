import React, {useState} from 'react';
import {Send} from "@mui/icons-material";
import './MessageForm.css';

interface MessageFormProps {
    submitFunc: (message: string) => void;
}

export function MessageForm(props: MessageFormProps): JSX.Element {
    const [message, setMessage] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setMessage(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
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
                <Send />
            </button>
        </form>
    );
}
