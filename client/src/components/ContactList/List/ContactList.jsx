import './contactlist.css';
import {PersonAdd} from "@mui/icons-material";

export default function ContactList(props) {

    const {contacts, setSelectedChat, setFormOpen} = props;

    const handleAddContactClick = () => {
        setFormOpen(state => !state);
    }

    const image_url = 'https://avatars.mds.yandex.net/i?id=5d8db0440aae4c3265492d1b3f8de64dddf64453-8342484-images-thumbs&n=13'
    return (
        <>
            <div className="contact-list">
                {contacts.length ?
                    <div className="contact-list-content">
                        {contacts.map((contact) => (
                            <div key={contact._id} className="contact-preview" onClick={() =>
                            {
                                setSelectedChat(contact.chat_id);
                            }}>
                                <img src={image_url} alt={contact.name} className="contact-image" />

                                <div className="contact-info" >
                                    <h3 className="contact-name">{contact.name}</h3>
                                </div>
                            </div>
                        ))}
                        <button className={"add-contact-btn"} onClick={handleAddContactClick}><PersonAdd/></button>
                    </div>

                    :
                    <div className="no-user-contacts">
                        <p>No contacts yet.</p>
                        <button className={"add-contact-btn"} onClick={handleAddContactClick}><PersonAdd/></button>
                    </div>
                }
            </div>
        </>
    );
}

