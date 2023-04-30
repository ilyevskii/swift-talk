import React, {useEffect, useState} from 'react';
import {Send} from "@mui/icons-material";
import './MessageForm.css';

import {useChatMessage, useMessageInfo} from "../../../hooks";

interface MessageFormProps {
    submitFunc: (message: string) => void;
}

export function MessageForm(props: MessageFormProps): JSX.Element {
    const [message, setMessage] = useState<string>('');

    const {editingMessage, setDeleteWindow} = useChatMessage();
    const {message_info} = useMessageInfo(editingMessage);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setMessage(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        props.submitFunc(message);
        setMessage('');
    }

    useEffect(() => {
        if (message_info) {
            setMessage(message_info.text);
            setDeleteWindow(null);
        }

    }, [message_info])

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
