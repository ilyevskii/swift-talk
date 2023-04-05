import {useEffect, useState} from "react";
import {useAuth} from "../../contexts/Auth/AuthContext";
import axios from "axios";

export function Chattt({socket, chat}) {
    const { user } = useAuth();
    const [currentMessage, setCurrentMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        if (currentMessage) {
            const messageData = {
                chat_id: chat,
                sender_id: user._id,
                text: currentMessage,
            }

            await socket.emit("send_message", messageData);
            setCurrentMessage("");
        }
    }

    useEffect(() => {

        socket.on("message_deleted", (data) => {
            setMessages((list) => list.filter(message => message._id !== data._id))
        })

        socket.on("receive_message", (data) => {
            setMessages((list) => [...list, data]);
        })

        return () => {
            socket.off('send_message');
            socket.off('delete_message');
        }

    }, [])

    useEffect(() => {
        setMessages([]);
        axios.get(`http://localhost:3001/api/message/${chat}`).then(result => {
            setMessages(result.data.messages)
        }).catch(err => {})
    }, [chat])


    return (
        <div className="Chat mt-3 container mx-auto">
            {chat ?
                <div>
                    <div className="chat-header">
                        <p>Chattt {chat}</p>
                    </div>
                    <div className="chat-body mt-10">
                    <hr/>
                    {messages.map((message, index) => (
                        <div className="message mt-4" key={index}>
                            <div>
                                <p className="message-time" style={{display: "inline"}}>{message.time}  </p>
                                <p className="message-sender" style={{display: "inline"}}>
                                ------ {message.sender_username} ------ </p>
                                <button
                                    className="p-1 ml-3"
                                    style={{display: "inline", border: "solid 1px"}}
                                    onClick={() => {
                                        socket.emit("delete_message", message);
                                    }}
                                >delete </button>
                            </div>
                            <p
                                style={{ display: "inline", color: message.sender_id === user._id ? 'green' : 'red'}}
                                className="mt-1"
                            > {message.text}</p>
                        </div>
                    ))}
                    </div>
                    <div className="chat-footer mt-10">
                        <input
                            className="p-2"
                            style={{border: "solid 1px"}}
                            type='text'
                            value={currentMessage}
                            placeholder='Input message'
                            onChange={(event) => {
                                setCurrentMessage(event.target.value);
                            }}
                        />
                        <button
                            className="ml-5 p-1 pl-5 pr-5"
                            onClick={sendMessage}
                            style={{border: "solid 1px"}}
                        >Send!</button>
                    </div>
                </div>
                :
                <p>Choose chat to start messaging!</p>
            }

        </div>

    )
}
